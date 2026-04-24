import { initializeGame } from "./core/gameState.js";

import { gameState } from "./core/gameState.js";

import { aStar } from "./algorithm/aStar.js";

initializeGame("Enhancer");

console.log("Maze:");
console.log(gameState.maze);

console.log("Player:");
console.log(gameState.player);

console.log("Center:");
console.log(gameState.center);

const path = aStar({
  maze: gameState.maze,

  start: {
    x: gameState.player.x,
    y: gameState.player.y,
  },

  goal: gameState.center,

  affinity: gameState.player.affinity,
});

console.log("PATH:");
console.log(path);