import { TILE_TYPES }
from "../data/constants.js";

import { MOVEMENT_COSTS }
from "../data/movementCosts.js";

import { heuristic }
from "./heuristic.js";

import { PriorityQueue }
from "../utils/priorityQueue.js";

function getKey(x, y) {
  return `${x},${y}`;
}

// =====================
// FIXED PATH
// =====================

function reconstructPath(
  cameFrom,
  currentKey
) {

  const path = [];

  while (currentKey) {

    const [x, y] =
      currentKey
        .split(",")
        .map(Number);

    path.unshift({
      x,
      y,
    });

    currentKey =
      cameFrom[currentKey];
  }

  return path;
}

function getNeighbors(
  maze,
  x,
  y
) {

  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const neighbors =
    [];

  for (const [dx, dy]
    of directions) {

    const nx =
      x + dx;

    const ny =
      y + dy;

    if (
      ny < 0 ||
      nx < 0 ||
      ny >= maze.length ||
      nx >= maze[0].length
    ) {
      continue;
    }

    const cell =
      maze[ny][nx];

    if (
      cell.type ===
      TILE_TYPES.WALL
    ) {
      continue;
    }

    neighbors.push(cell);
  }

  return neighbors;
}

export function aStar({

  maze,

  start,

  goal,

  affinity,

}) {

  const openSet =
    new PriorityQueue();

  openSet.enqueue(
    start,
    0
  );

  const cameFrom =
    {};

  const gScore =
    {};

  const fScore =
    {};

  const startKey =
    getKey(
      start.x,
      start.y
    );

  gScore[startKey] =
    0;

  fScore[startKey] =
    heuristic(
      start,
      goal
    );

  while (
    !openSet.isEmpty()
  ) {

    const current =
      openSet.dequeue();

    const currentKey =
      getKey(
        current.x,
        current.y
      );

    // reached goal

    if (
      current.x ===
        goal.x &&

      current.y ===
        goal.y
    ) {

      return reconstructPath(
        cameFrom,
        currentKey
      );
    }

    const neighbors =
      getNeighbors(

        maze,

        current.x,

        current.y
      );

    for (const neighbor
      of neighbors) {

      const neighborKey =
        getKey(
          neighbor.x,
          neighbor.y
        );

      const moveCost =
        MOVEMENT_COSTS[
          affinity
        ][
          neighbor.nenType
        ];

      const tentativeG =
        gScore[
          currentKey
        ] + moveCost;

      if (

        gScore[
          neighborKey
        ] === undefined ||

        tentativeG <
          gScore[
            neighborKey
          ]
      ) {

        cameFrom[
          neighborKey
        ] =
          currentKey;

        gScore[
          neighborKey
        ] =
          tentativeG;

        fScore[
          neighborKey
        ] =
          tentativeG +

          heuristic(
            neighbor,
            goal
          );

        openSet.enqueue(

          neighbor,

          fScore[
            neighborKey
          ]
        );
      }
    }
  }

  return null;
}