/** Plus court chemin (en nombre d'arêtes), départ et arrivée inclus. Vide si inaccessible. */
export function bfs(
  adj: ReadonlyMap<string, readonly string[]>,
  start: string,
  goal: string,
): string[] {
  if (start === goal) return [start];
  const prev = new Map<string, string>([[start, start]]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift() as string;
    for (const next of adj.get(node) ?? []) {
      if (prev.has(next)) continue;
      prev.set(next, node);
      if (next === goal) {
        const path = [goal];
        while (path[0] !== start) path.unshift(prev.get(path[0]) as string);
        return path;
      }
      queue.push(next);
    }
  }
  return [];
}
