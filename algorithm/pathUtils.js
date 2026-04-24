export function isSamePosition(a, b) {
  return (
    a.x === b.x &&
    a.y === b.y
  );
}

export function isAdjacent(a, b) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);

  return dx + dy === 1;
}