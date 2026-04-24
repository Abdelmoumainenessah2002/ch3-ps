import {
  GRID_SIZE,
  TILE_TYPES,
} from "../data/constants.js";

import {
  NEN_TYPES_LIST,
} from "../data/nenTypes.js";

function randomNenType() {

  return NEN_TYPES_LIST[
    Math.floor(
      Math.random() *
      NEN_TYPES_LIST.length
    )
  ];
}

function createPathCell(
  x,
  y
) {

  return {

    x,
    y,

    type:
      TILE_TYPES.PATH,

    nenType:
      randomNenType(),

    discovered:
      false,

    visited:
      false,
  };
}

function createWallCell(
  x,
  y
) {

  return {

    x,
    y,

    type:
      TILE_TYPES.WALL,

    nenType:
      null,

    discovered:
      false,

    visited:
      false,
  };
}

export function generateMaze() {

  const maze = [];

  // ====================
  // fill with walls
  // ====================

  for (
    let y = 0;
    y < GRID_SIZE;
    y++
  ) {

    const row = [];

    for (
      let x = 0;
      x < GRID_SIZE;
      x++
    ) {

      row.push(
        createWallCell(
          x,
          y
        )
      );
    }

    maze.push(row);
  }

  // ====================
  // random walk
  // ====================

  let x = 0;
  let y = 0;

  maze[y][x] =
    createPathCell(
      x,
      y
    );

  const directions = [

    [1, 0],

    [-1, 0],

    [0, 1],

    [0, -1],
  ];

  for (
    let i = 0;
    i < 700;
    i++
  ) {

    const dir =
      directions[
        Math.floor(
          Math.random() *
          directions.length
        )
      ];

    const nx =
      x + dir[0];

    const ny =
      y + dir[1];

    if (
      nx < 0 ||
      ny < 0 ||

      nx >= GRID_SIZE ||
      ny >= GRID_SIZE
    ) {
      continue;
    }

    x = nx;
    y = ny;

    maze[y][x] =
      createPathCell(
        x,
        y
      );
  }

  // ====================
  // force path
  // start -> center
  // ====================

  const centerX =
    Math.floor(
      GRID_SIZE / 2
    );

  const centerY =
    Math.floor(
      GRID_SIZE / 2
    );

  let cx = 0;
  let cy = 0;

  while (
    cx !== centerX ||
    cy !== centerY
  ) {

    maze[cy][cx] =
      createPathCell(
        cx,
        cy
      );

    if (
      cx < centerX
    ) {

      cx++;
    }

    else if (
      cy < centerY
    ) {

      cy++;
    }
  }

  maze[centerY][centerX] =
    createPathCell(
      centerX,
      centerY
    );

  // ====================
  // enemy safe zone
  // ====================

  const ex =
    GRID_SIZE - 1;

  const ey =
    GRID_SIZE - 1;

  const enemyZone = [

    [ex, ey],

    [ex - 1, ey],

    [ex, ey - 1],

    [ex - 1, ey - 1],
  ];

  for (const [zx, zy]
    of enemyZone) {

    maze[zy][zx] =
      createPathCell(
        zx,
        zy
      );
  }

  // ====================
  // connect enemy
  // to center
  // ====================

  let exPath =
    GRID_SIZE - 1;

  let eyPath =
    GRID_SIZE - 1;

  while (
    exPath !== centerX ||
    eyPath !== centerY
  ) {

    maze[eyPath][exPath] =
      createPathCell(
        exPath,
        eyPath
      );

    if (
      exPath > centerX
    ) {

      exPath--;
    }

    else if (
      eyPath > centerY
    ) {

      eyPath--;
    }
  }

  return maze;
}