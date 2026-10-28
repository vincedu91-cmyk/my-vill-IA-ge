'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Agent } from '@/engine/agents';
import { isChatMessage, MAX_HISTORY, MAX_MESSAGE_LENGTH, type Conversation } from '@/engine/discussion';

interface RecognitionResult {
  isFinal: boolean;
  0: { transcript: string };
}

interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { resultIndex: number; results: ArrayLike<RecognitionResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type VoiceWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};

function recognitionConstructor() {
  const browser = window as VoiceWindow;
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}

const subscribe = () => () => {};

interface AgentDiscussionProps {
  agent: Agent;
  conversation: Conversation;
  onChange(conversation: Conversation): void;
}

export function AgentDiscussion({ agent, conversation, onChange }: AgentDiscussionProps) {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const voiceSupported = useSyncExternalStore(subscribe, () => Boolean(recognitionConstructor()) && window.isSecureContext, () => false);
  const recognitionRef = useRef<Recognition | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentRef = useRef({ conversation, onChange });

  useEffect(() => {
    currentRef.current = { conversation, onChange };
  }, [conversation, onChange]);

  useEffect(() => () => {
    requestRef.current?.abort();
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    }
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [conversation.messages.length, pending]);

  const send = async () => {
    const content = conversation.draft.trim();
    if (!content || pending || listening || content.length > MAX_MESSAGE_LENGTH) return;
    setError('');
    setPending(content);
    const controller = new AbortController();
    requestRef.current = controller;
    try {
      const response = await fetch('/api/discussion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          messages: [...conversation.messages.slice(-(MAX_HISTORY - 2)), { role: 'user', content }],
        }),
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(65_000)]),
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string'
            ? data.error : 'Impossible d’envoyer le message. Réessaie.',
        );
      }
      if (typeof data !== 'object' || data === null || !('message' in data) || !isChatMessage(data.message) || data.message.role !== 'assistant') {
        throw new Error('La réponse reçue est invalide. Réessaie.');
      }
      if (controller.signal.aborted) return;
      onChange({ draft: '', messages: [...conversation.messages, { role: 'user', content }, data.message] });
      inputRef.current?.focus();
    } catch (cause) {
      if (controller.signal.aborted) return;
      setError(cause instanceof Error
        ? cause.name === 'TimeoutError' ? 'Le délai de réponse est dépassé. Réessaie.'
          : cause.name === 'TypeError' ? 'Connexion au serveur impossible. Vérifie ta connexion et réessaie.'
            : cause.message
        : 'Impossible d’envoyer le message. Réessaie.');
    } finally {
      if (!controller.signal.aborted) setPending(null);
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  const toggleVoice = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Constructor = recognitionConstructor();
    if (!Constructor || !voiceSupported) {
      setError('La dictée n’est pas disponible dans ce navigateur. Tu peux écrire ton message.');
      return;
    }
    setError('');
    const recognition = new Constructor();
    recognitionRef.current = recognition;
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;
    let text = conversation.draft;
    recognition.onresult = (event) => {
      let preview = '';
      for (let index = event.resultIndex; index < event.results.length; index++) {
        const result = event.results[index];
        if (result.isFinal) text = `${text}${text && !text.endsWith(' ') ? ' ' : ''}${result[0].transcript}`;
        else preview += result[0].transcript;
      }
      if (text.length > MAX_MESSAGE_LENGTH) {
        setError(`La dictée dépasse ${MAX_MESSAGE_LENGTH} caractères. Raccourcis ton message avant l’envoi.`);
        recognition.stop();
      }
      currentRef.current.onChange({ ...currentRef.current.conversation, draft: text });
      setInterim(preview);
    };
    recognition.onerror = (event) => {
      setError(event.error === 'not-allowed' || event.error === 'service-not-allowed'
        ? 'Accès au micro refusé. Autorise le microphone dans ton navigateur, ou écris ton message.'
        : event.error === 'no-speech'
          ? 'Aucune parole détectée. Réessaie ou écris ton message.'
          : 'La dictée a été interrompue. Vérifie le micro et ta connexion, puis réessaie.');
      setListening(false);
      setInterim('');
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      setInterim('');
      inputRef.current?.focus();
    };
    setListening(true);
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setError('Impossible de démarrer le micro. Vérifie ses autorisations.');
    }
  };

  if (agent.human) {
    return <p className="text-sm leading-relaxed">Vincent est le décideur humain. Aucun assistant ne répond ni ne valide en son nom. Choisis un agent IA pour commencer une discussion.</p>;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div role="log" aria-label={`Discussion avec ${agent.name}`} aria-live="polite" aria-busy={pending !== null} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1">
        {conversation.messages.length === 0 && !pending && (
          <div className="py-5 text-center">
            <h3 className="mb-2 text-xl font-semibold">Parle à {agent.name}</h3>
            <p className="text-sm leading-relaxed text-muted">Écris ton message ou dicte-le avec le micro.<br />{agent.name} te répond ici.</p>
            <button type="button" className="btn mt-4 text-left" onClick={() => { onChange({ ...conversation, draft: 'Comment peux-tu m’aider sur mon projet ?' }); inputRef.current?.focus(); }}>
              Comment peux-tu m’aider ?
            </button>
          </div>
        )}
        {conversation.messages.map((message, index) => (
          <div key={index} className={`max-w-[95%] rounded-2xl px-3 py-2 ${message.role === 'user' ? 'ml-auto bg-red-soft' : 'bg-glass-strong'}`}>
            <p className="mb-1 text-xs font-semibold">{message.role === 'user' ? 'Toi' : agent.name}</p>
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed [overflow-wrap:anywhere]">{message.content}</p>
          </div>
        ))}
        {pending && (
          <>
            <div className="ml-auto max-w-[95%] rounded-2xl bg-red-soft px-3 py-2">
              <p className="mb-1 text-xs font-semibold">Toi</p>
              <p className="whitespace-pre-wrap break-words text-sm [overflow-wrap:anywhere]">{pending}</p>
            </div>
            <p role="status" className="text-sm text-muted">{agent.name} prépare sa réponse…</p>
          </>
        )}
        <div ref={endRef} />
      </div>

      <div className="shrink-0">
        {error && <p role="alert" className="mb-2 text-sm text-red">{error}</p>}
        <form onSubmit={(event) => { event.preventDefault(); void send(); }} className="flex items-end gap-2">
          <label className="sr-only" htmlFor={`message-${agent.id}`}>Message à {agent.name}</label>
          <textarea
            ref={inputRef}
            id={`message-${agent.id}`}
            rows={2}
            maxLength={MAX_MESSAGE_LENGTH}
            value={conversation.draft}
            disabled={pending !== null || listening}
            placeholder={`Écris à ${agent.name}…`}
            className="min-w-0 flex-1 resize-none rounded-2xl border border-line bg-glass-strong px-3 py-2 text-base disabled:opacity-60"
            onChange={(event) => onChange({ ...conversation, draft: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                void send();
              }
            }}
          />
          <button type="button" className={`btn size-11 shrink-0 p-0 ${listening ? 'btn-primary' : ''}`} disabled={pending !== null || !voiceSupported} aria-label={listening ? 'Arrêter la dictée' : 'Dicter un message'} aria-pressed={listening} title={voiceSupported ? 'Dicter un message' : 'Dictée indisponible dans ce navigateur'} onClick={toggleVoice}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {listening ? <rect x="6" y="6" width="12" height="12" rx="1" /> : <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" /></>}
            </svg>
          </button>
          <button type="submit" className="btn btn-primary size-11 shrink-0 p-0" disabled={!conversation.draft.trim() || conversation.draft.length > MAX_MESSAGE_LENGTH || pending !== null || listening} aria-label="Envoyer le message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 7-7 7 7M12 5v15" /></svg>
          </button>
        </form>
        <p role="status" className="mt-1 text-xs text-muted">
          {listening ? `Micro actif : ${interim || 'parle, puis arrête la dictée pour relire.'}` : voiceSupported ? 'Entrée : envoyer · Maj+Entrée : nouvelle ligne' : 'Dictée indisponible ici : utilise Chrome ou Edge sur HTTPS ou localhost.'}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">Réponses IA à vérifier. Aucun outil exécuté. Tes messages sont transmis au service IA configuré ; évite les données sensibles. La dictée peut utiliser le service vocal du navigateur.</p>
      </div>
    </div>
  );
}
