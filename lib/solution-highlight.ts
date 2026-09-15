export function addHighlightedSolution(
  highlighted: ReadonlySet<string>,
  solution: string
) {
  if (highlighted.has(solution)) return highlighted;

  return new Set([...highlighted, solution]);
}
