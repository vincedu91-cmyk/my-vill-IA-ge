import {
  AGENTS,
  AGENT_SKILLS,
  agentInstructions,
} from "../../../engine/agents";
import { isChatMessage, MAX_HISTORY } from "../../../engine/discussion";

export const runtime = "nodejs";

function error(message: string, status: number) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return error("Origine de la requête refusée.", 403);
  }

  let body: unknown;
  try {
    // Limit the body while reading, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return error("Message manquant.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 1_000_000) {
        await reader.cancel();
        return error("Discussion trop volumineuse.", 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return error("Requête JSON invalide.", 400);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("agentId" in body) ||
    !("messages" in body)
  ) {
    return error("Agent et messages requis.", 400);
  }
  const agent = AGENTS.find((item) => item.id === body.agentId);
  if (!agent) return error("Agent inconnu.", 400);
  if (agent.human)
    return error("Vincent est humain : aucune IA ne répond en son nom.", 400);
  const messages = body.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_HISTORY ||
    !messages.every(isChatMessage) ||
    messages.at(-1)?.role !== "user" ||
    messages.some(
      (message, index) =>
        message.role !== (index % 2 === 0 ? "user" : "assistant"),
    )
  ) {
    return error(
      "Historique invalide : alterne les messages utilisateur et assistant, et termine par une question.",
      400,
    );
  }

  const baseUrl = process.env.CHAT_API_BASE_URL;
  const model = process.env.CHAT_API_MODEL;
  if (!baseUrl || !model) {
    return error(
      "Discussion non configurée : renseigne CHAT_API_BASE_URL et CHAT_API_MODEL côté serveur.",
      503,
    );
  }
  let endpoint: URL;
  try {
    endpoint = new URL(`${baseUrl.replace(/\/+$/, "")}/chat/completions`);
    if (
      !["https:", "http:"].includes(endpoint.protocol) ||
      endpoint.username ||
      endpoint.password
    ) {
      throw new Error("Invalid endpoint");
    }
  } catch {
    return error("La configuration CHAT_API_BASE_URL est invalide.", 503);
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CHAT_API_KEY
          ? { Authorization: `Bearer ${process.env.CHAT_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `Tu es ${agent.name}, dans le quartier Direction MKD du village My vill[IA]ge, pour la direction Marketing et Digital de Generali France.
Réponds en français, tutoie et reste professionnel, convivial et factuel.
Voici ton rôle et tes compétences :
Rôle : ${agent.role}. Mission : ${agent.mission}
Domaines de compétence : ${[
              ...agent.skills.map((skill) => AGENT_SKILLS[skill]),
              ...agent.specialties.map((specialty) => specialty.label),
            ].join(", ")}.
Périmètre, limites et validations de la fiche de référence :
${agentInstructions(agent)}
Les consignes opérationnelles de cette fiche décrivent le rôle, pas les capacités disponibles dans cette discussion.
Cette discussion ne te donne accès à aucun outil, fichier, note du Cerveau ni système externe.
Ne prétends jamais avoir lu un fichier, exécuté une tâche, consulté une compétence, publié ou obtenu une validation.
Tu peux conseiller, rédiger et expliquer dans le chat uniquement. Distingue faits, hypothèses et informations à confirmer.
N'invente pas de chiffres, de sources, de règles de marque ou d'avis juridique. Vincent est le décideur humain : ne valide jamais en son nom.`,
          },
          ...messages,
        ],
        stream: false,
      }),
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(60_000)]),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[discussion] Provider HTTP error", response.status);
      return error(
        response.status === 429
          ? "Le service IA est occupé. Réessaie dans un instant."
          : "Le service IA a refusé la demande. Vérifie sa configuration côté serveur.",
        502,
      );
    }
    const data: unknown = await response.json();
    const content = readReply(data);
    if (!content) {
      console.error("[discussion] Invalid provider response");
      return error(
        "Le service IA a renvoyé une réponse vide ou invalide.",
        502,
      );
    }
    return Response.json(
      { message: { role: "assistant", content } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (cause) {
    console.error(
      "[discussion] Provider request failed",
      cause instanceof Error ? cause.name : "Unknown error",
    );
    return error(
      "Le service IA est injoignable ou le délai de réponse est dépassé. Réessaie.",
      502,
    );
  }
}

function readReply(data: unknown): string | null {
  if (
    typeof data !== "object" ||
    data === null ||
    !("choices" in data) ||
    !Array.isArray(data.choices)
  )
    return null;
  const choice: unknown = data.choices[0];
  if (typeof choice !== "object" || choice === null || !("message" in choice))
    return null;
  const message = choice.message;
  return isChatMessage(message) && message.role === "assistant"
    ? message.content.trim()
    : null;
}
