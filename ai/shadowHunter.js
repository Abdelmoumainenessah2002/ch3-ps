import { aStar } from "../algorithm/aStar.js";

export function updateShadowHunter(
  gameState
) {
  if (gameState.gameOver) {
    return;
  }

  const hunter =
    gameState.shadowHunter;

  const path = aStar({
    maze: gameState.maze,

    start: {
      x: hunter.x,
      y: hunter.y,
    },

    goal: gameState.center,

    affinity: hunter.affinity,
  });

  if (!path || path.length === 0) {
    return;
  }

  const nextMove = path[0];

  hunter.x = nextMove.x;
  hunter.y = nextMove.y;

  hunter.path = path;
}