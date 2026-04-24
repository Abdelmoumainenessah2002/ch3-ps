import { aStar }
from "../algorithm/aStar.js";

export function moveShadowHunter(
  gameState
) {

  const hunter =
    gameState.shadowHunter;

  const center =
    gameState.center;

  const path =
    aStar({

      maze:
        gameState.maze,

      start: {
        x: hunter.x,
        y: hunter.y,
      },

      goal: {
        x: center.x,
        y: center.y,
      },

      affinity:
        hunter.affinity,
    });

  if (
    !path ||
    path.length < 2
  ) {
    return;
  }

  const nextStep =
    path[1];

  hunter.x =
    nextStep.x;

  hunter.y =
    nextStep.y;
}