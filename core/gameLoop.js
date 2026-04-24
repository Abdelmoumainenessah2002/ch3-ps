import { moveShadowHunter }
from "../systems/shadowHunterSystem.js";

let gameInterval =
  null;

export function startGameLoop(
  gameState,
  render
) {

  if (gameInterval) {

    clearInterval(
      gameInterval
    );
  }

  gameInterval =
    setInterval(() => {

      if (
        gameState.gameOver
      ) {
        return;
      }

      // move enemy

      moveShadowHunter(
        gameState
      );

      // enemy wins

      if (

        gameState
          .shadowHunter.x ===
        gameState.center.x &&

        gameState
          .shadowHunter.y ===
        gameState.center.y
      ) {

        gameState.gameOver =
          true;

        gameState.winner =
          "SHADOW_HUNTER";
      }

      render();

    }, 500);
}