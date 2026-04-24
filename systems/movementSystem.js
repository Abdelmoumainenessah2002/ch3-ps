import {
  revealCells,
} from "../algorithm/fogOfWar.js";

import {
  MOVEMENT_COSTS
} from "../data/movementCosts.js";

export function movePlayer(

  gameState,

  newX,

  newY

) {

  const maze =
    gameState.maze;

  // ====================
  // bounds
  // ====================

  if (

    newX < 0 ||

    newY < 0 ||

    newY >= maze.length ||

    newX >= maze[0].length

  ) {

    return false;
  }

  const cell =
    maze[newY][newX];

  // ====================
  // wall
  // ====================

  if (

    cell.type ===
    "wall"

  ) {

    return false;
  }

  // ====================
  // danger zone
  // ====================

  const dist =
    Math.abs(

      newX -

      gameState
        .shadowHunter.x

    ) +

    Math.abs(

      newY -

      gameState
        .shadowHunter.y

    );

  if (dist <= 1) {

    gameState.gameOver =
      true;

    gameState.winner =
      "SHADOW_HUNTER";

    return false;
  }

  // ====================
  // move player
  // ====================

  gameState.player.x =
    newX;

  gameState.player.y =
    newY;

  // ====================
  // reveal fog
  // ====================

  revealCells(

    maze,

    newX,

    newY,

    gameState.player
      .visionRadius
  );

  // ====================
  // ENERGY SYSTEM
  // ====================

  const moveCost =

    MOVEMENT_COSTS[

      gameState.player
        .affinity

    ][
      cell.nenType
    ];

  // base energy drain

  gameState.player.energy -=

    moveCost * 2;

  // affinity synergy

  if (

    cell.nenType ===

    gameState.player
      .affinity

  ) {

    // best harmony

    if (
      moveCost === 1
    ) {

      gameState.player.energy +=
        15;
    }

    // good harmony

    else if (
      moveCost === 2
    ) {

      gameState.player.energy +=
        10;
    }

    // neutral

    else if (
      moveCost === 3
    ) {

      gameState.player.energy +=
        5;
    }

    // unstable

    else if (
      moveCost === 4
    ) {

      gameState.player.energy -=
        5;
    }

    // dangerous

    else if (
      moveCost >= 5
    ) {

      gameState.player.energy -=
        10;
    }
  }

  // clamp max

  if (

    gameState.player.energy >
    100

  ) {

    gameState.player.energy =
      100;
  }

  // exhausted

  if (

    gameState.player.energy <=
    0

  ) {

    gameState.player.energy =
      0;

    gameState.gameOver =
      true;

    gameState.winner =
      "EXHAUSTED";
  }

  return true;
}