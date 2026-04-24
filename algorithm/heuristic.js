export function heuristic(a, b) {
  return (
    Math.abs(a.x - b.x) +
    Math.abs(a.y - b.y)
  );
}