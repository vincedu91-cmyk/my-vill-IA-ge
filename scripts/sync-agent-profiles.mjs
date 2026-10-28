import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = join(root, ".claude", "agents");
const profiles = Object.fromEntries(
  readdirSync(directory).filter((name) => name.endsWith(".md")).sort().map((name) => {
    const content = readFileSync(join(directory, name), "utf8").replace(/\r\n/g, "\n");
    if (!content.startsWith("---\n") || !content.includes("\n---\n")) {
      throw new Error(`Frontmatter manquant : ${name}`);
    }
    return [name.slice(0, -3), content];
  }),
);
writeFileSync(join(root, "src", "engine", "agent-profiles.json"), `${JSON.stringify(profiles, null, 2)}\n`);
console.log(`${Object.keys(profiles).length} fiches synchronisees.`);
