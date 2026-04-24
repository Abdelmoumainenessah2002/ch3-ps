function reachedCenter(
  entity,
  center
) {
  const dx = Math.abs(
    entity.x - center.x
  );

  const dy = Math.abs(
    entity.y - center.y
  );

  return dx <= 1 && dy <= 1;
}

export function checkWinCondition(
  gameState
) {
  if (gameState.gameOver) {
    return;
  }

  const playerReached =
    reachedCenter(
      gameState.player,
      gameState.center
    );

  const hunterReached =
    reachedCenter(
      gameState.shadowHunter,
      gameState.center
    );

  if (playerReached) {
    gameState.gameOver = true;

    gameState.winner = "PLAYER";

    return;
  }

  if (hunterReached) {
    gameState.gameOver = true;

    gameState.winner =
      "SHADOW_HUNTER";
  }
}