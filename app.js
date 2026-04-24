import {
  initializeGame,
  gameState,
} from "./core/gameState.js";

import {
  revealCells
} from "./algorithm/fogOfWar.js";

import {
  renderGrid
} from "./ui/gridRenderer.js";

import {
  movePlayer
} from "./systems/movementSystem.js";

import {
  checkWinCondition
} from "./systems/winConditionSystem.js";

import {
  startGameLoop
} from "./core/gameLoop.js";

import {
  renderCompass
} from "./ui/compassUI.js";

import {
  aStar
} from "./algorithm/aStar.js";

import {
  buildVisibleMaze
} from "./algorithm/buildVisibleMaze.js";

import {
  MOVEMENT_COSTS
} from "./data/movementCosts.js";

const TILE_SIZE = 32;

const canvas =
  document.getElementById(
    "gameCanvas"
  );

// ======================
// BEST PATH
// ======================

function updateBestPath() {

  const path =
    aStar({

      maze:
        gameState.maze,

      start: {

        x:
          gameState.player.x,

        y:
          gameState.player.y,
      },

      goal: {

        x:
          gameState.center.x,

        y:
          gameState.center.y,
      },

      affinity:
        gameState.player
          .affinity,
    });

  gameState.previewPath =
    path || [];

  // ====================
  // calculate path danger
  // ====================

  let totalCost = 0;

  for (const step of path || []) {

    const cell =
      gameState.maze[
        step.y
      ][
        step.x
      ];

    if (
      !cell ||
      !cell.nenType
    ) {
      continue;
    }

    totalCost +=

      MOVEMENT_COSTS[
        gameState.player
          .affinity
      ][
        cell.nenType
      ];
  }

  gameState.pathCost =
    totalCost;
}

// ======================
// RENDER
// ======================

function render() {

  const compass =

    renderCompass(
      gameState
    );

  // ====================
  // compass
  // ====================

  document.getElementById(
  "compass"
).innerHTML = `

  Direction:
  ${compass.direction}

  <br>

  Distance:
  ${compass.distance}

  <br>

  Path Cost:
  ${gameState.pathCost}

`;

  // ====================
  // update best path
  // ====================

  updateBestPath();

  // ====================
  // energy bar
  // ====================

  const energyFill =

    document.getElementById(
      "energy-fill"
    );

  energyFill.style.width =

    `${gameState.player.energy}%`;

  // ====================
  // render maze
  // ====================

  renderGrid(
    canvas,
    gameState
  );

  // ====================
  // game result
  // ====================

  if (
    gameState.gameOver
  ) {

    document.getElementById(
      "game-result"
    ).innerText =

      `Winner:
      ${gameState.winner}`;
  }
}

// ======================
// SMART MOVEMENT
// ======================

function followPath(goal) {

  async function move() {

    while (true) {

      if (
        gameState.gameOver
      ) {
        return;
      }

      const path =
        aStar({

          maze:
            buildVisibleMaze(
              gameState.maze
            ),

          start: {

            x:
              gameState.player.x,

            y:
              gameState.player.y,
          },

          goal: {

            x:
              goal.x,

            y:
              goal.y,
          },

          affinity:
            gameState.player
              .affinity,
        });

      // no path

      if (
        !path ||
        path.length < 2
      ) {
        return;
      }

      const nextStep =
        path[1];

      const cell =
        gameState.maze[
          nextStep.y
        ][
          nextStep.x
        ];

      // movement cost

      const cost =
        MOVEMENT_COSTS[
          gameState.player
            .affinity
        ][
          cell.nenType
        ];

      movePlayer(

        gameState,

        nextStep.x,

        nextStep.y
      );

      checkWinCondition(
        gameState
      );

      render();

      // reached goal

      if (

        gameState.player.x ===
          goal.x &&

        gameState.player.y ===
          goal.y
      ) {
        return;
      }

      // dynamic speed

      const delay =
        cost * 180;

      await new Promise(

        (resolve) =>

          setTimeout(
            resolve,
            delay
          )
      );
    }
  }

  move();
}

// ======================
// START GAME
// ======================

function startGame(
  affinity
) {

  initializeGame(
    affinity
  );

  revealCells(

    gameState.maze,

    gameState.player.x,

    gameState.player.y,

    gameState.player
      .visionRadius
  );

  canvas.style.display =
    "block";

  render();

  startGameLoop(
    gameState,
    render
  );
}

// ======================
// CLICK MOVE
// ======================

canvas.addEventListener(

  "click",

  (event) => {

    if (
      gameState.gameOver
    ) {
      return;
    }

    const rect =
      canvas.getBoundingClientRect();

    const mouseX =
      event.clientX -
      rect.left;

    const mouseY =
      event.clientY -
      rect.top;

    const gridX =
      Math.floor(
        mouseX /
        TILE_SIZE
      );

    const gridY =
      Math.floor(
        mouseY /
        TILE_SIZE
      );

    const targetCell =

      gameState.maze[
        gridY
      ]?.[gridX];

    if (

      !targetCell ||

      !targetCell.discovered ||

      targetCell.type ===
        "wall"
    ) {
      return;
    }

    followPath({

      x: gridX,

      y: gridY,
    });
  }
);

// ======================
// START BUTTONS
// ======================

document

  .querySelectorAll(
    "[data-affinity]"
  )

  .forEach((button) => {

    button.addEventListener(

      "click",

      () => {

        const affinity =

          button.dataset
            .affinity;

        document.getElementById(
          "start-screen"
        ).style.display =

          "none";

        document.getElementById(
          "game-ui"
        ).style.display =

          "block";

        startGame(
          affinity
        );
      }
    );
  });