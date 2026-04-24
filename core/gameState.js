import {
  GRID_SIZE,
  PLAYER_START,
  ENEMY_START,
  VISION_RADIUS,
} from "../data/constants.js";

import { generateMaze } from "../algorithm/mazeGenerator.js";

export const gameState = {
  gridSize: GRID_SIZE,

  maze: [],

  player: {
    x: PLAYER_START.x,
    y: PLAYER_START.y,

    affinity: null,

    visionRadius: VISION_RADIUS,

    path: [],
    energy: 100,
  },

  shadowHunter: {
    x: ENEMY_START.x,
    y: ENEMY_START.y,

    affinity: "Emitter",

    path: [],
  },

  center: {
    x: Math.floor(GRID_SIZE / 2),
    y: Math.floor(GRID_SIZE / 2),
  },

  gameStarted: false,

  gameOver: false,

  winner: null,

  previewPath: [],
};

export function initializeGame(
  playerAffinity
) {
  gameState.maze =
    generateMaze();

  // player

  gameState.player.x =
    PLAYER_START.x;

  gameState.player.y =
    PLAYER_START.y;

  gameState.player.affinity =
    playerAffinity;

  gameState.player.energy =
  100;

  gameState.player.path =
    [];

  // place enemy on valid path

  let found = false;

  for (
    let y =
      GRID_SIZE - 1;
    y >= 0;
    y--
  ) {
    for (
      let x =
        GRID_SIZE - 1;
      x >= 0;
      x--
    ) {
      const cell =
        gameState.maze[y][x];

      if (
        cell.type ===
        "path"
      ) {
        gameState
          .shadowHunter.x =
          x;

        gameState
          .shadowHunter.y =
          y;

        found = true;

        break;
      }
    }

    if (found) {
      break;
    }
  }

  gameState.shadowHunter
    .path = [];

  gameState.gameStarted =
    true;

  gameState.gameOver =
    false;

  gameState.winner =
    null;

  gameState.previewPath =
    [];
}