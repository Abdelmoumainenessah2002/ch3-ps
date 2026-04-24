export function renderCompass(
  gameState
) {
  const player =
    gameState.player;

  const center =
    gameState.center;

  const dx =
    center.x - player.x;

  const dy =
    center.y - player.y;

  let horizontal = "";

  let vertical = "";

  if (dx > 0)
    horizontal = "E";

  else if (dx < 0)
    horizontal = "W";

  if (dy > 0)
    vertical = "S";

  else if (dy < 0)
    vertical = "N";

  const direction =
    vertical + horizontal;

  const distance =
    Math.abs(dx) +
    Math.abs(dy);

  return {
    direction,
    distance,
  };
}