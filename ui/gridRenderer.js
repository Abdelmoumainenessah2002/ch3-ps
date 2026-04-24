import { MOVEMENT_COSTS } from "../data/movementCosts.js";

const TILE_SIZE = 32;

const COLORS = {
  wall: "#111",

  player: "#00ff99",

  enemy: "#ff0044",

  center: "#ffd700",

  fog: "#000",
};

const NEN_COLORS = {
  Enhancer: "#4CAF50",

  Transmuter: "#9C27B0",

  Conjurer: "#2196F3",

  Manipulator: "#FF9800",

  Emitter: "#F44336",

  Specialist: "#E91E63",
};

export function renderGrid(
  canvas,
  gameState
) {

  const ctx =
    canvas.getContext("2d");

  const maze =
    gameState.maze;

  canvas.width =
    maze[0].length *
    TILE_SIZE;

  canvas.height =
    maze.length *
    TILE_SIZE;

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // =====================
  // DRAW MAZE
  // =====================

  for (let y = 0; y < maze.length; y++) {

    for (
      let x = 0;
      x < maze[y].length;
      x++
    ) {

      const cell =
        maze[y][x];

      const px =
        x * TILE_SIZE;

      const py =
        y * TILE_SIZE;

      // fog

      if (
        !cell.discovered
      ) {

        ctx.fillStyle =
          COLORS.fog;

        ctx.fillRect(
          px,
          py,
          TILE_SIZE,
          TILE_SIZE
        );

        continue;
      }

      // wall

      if (
        cell.type ===
        "wall"
      ) {

        ctx.fillStyle =
          COLORS.wall;
      }

      // path

      else {

        ctx.fillStyle =
          NEN_COLORS[
            cell.nenType
          ];
      }

      ctx.fillRect(
        px,
        py,
        TILE_SIZE,
        TILE_SIZE
      );

      // border

      ctx.strokeStyle =
        "#222";

      ctx.strokeRect(
        px,
        py,
        TILE_SIZE,
        TILE_SIZE
      );

      // movement cost

      if (
        cell.type !==
        "wall"
      ) {

        const cost =
          MOVEMENT_COSTS[
            gameState.player
              .affinity
          ][
            cell.nenType
          ];

        ctx.fillStyle =
          "white";

        ctx.font =
          "12px Arial";

        ctx.fillText(
          cost,

          px + 10,

          py + 20
        );
      }
    }
  }

  // =====================
  // A* PATH
  // =====================

  const path =
    Array.isArray(
      gameState.previewPath
    )
      ? gameState.previewPath
      : [];

  if (
    path.length > 1
  ) {

    ctx.beginPath();

    ctx.strokeStyle =
      "#00ffff";

    ctx.lineWidth = 4;

    for (
      let i = 0;
      i < path.length;
      i++
    ) {

      const step =
        path[i];

      const cx =
        step.x *
          TILE_SIZE +
        TILE_SIZE / 2;

      const cy =
        step.y *
          TILE_SIZE +
        TILE_SIZE / 2;

      if (i === 0) {

        ctx.moveTo(
          cx,
          cy
        );
      }

      else {

        ctx.lineTo(
          cx,
          cy
        );
      }
    }

    ctx.stroke();
  }

  // =====================
  // DANGER ZONE
  // =====================

  const radius = 1;

  for (
    let y = 0;
    y < maze.length;
    y++
  ) {

    for (
      let x = 0;
      x < maze[y].length;
      x++
    ) {

      const dist =
        Math.abs(
          x -
            gameState
              .shadowHunter.x
        ) +

        Math.abs(
          y -
            gameState
              .shadowHunter.y
        );

      if (
        dist <= radius
      ) {

        ctx.fillStyle =
          "rgba(255,0,0,0.25)";

        ctx.fillRect(
          x * TILE_SIZE,
          y * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  }

  // =====================
  // CENTER
  // =====================

  ctx.fillStyle =
    COLORS.center;

  ctx.fillRect(

    gameState.center.x *
      TILE_SIZE +
      8,

    gameState.center.y *
      TILE_SIZE +
      8,

    TILE_SIZE - 16,

    TILE_SIZE - 16
  );

  // =====================
  // PLAYER
  // =====================

  ctx.fillStyle =
    COLORS.player;

  ctx.beginPath();

  ctx.arc(

    gameState.player.x *
      TILE_SIZE +
      TILE_SIZE / 2,

    gameState.player.y *
      TILE_SIZE +
      TILE_SIZE / 2,

    10,

    0,

    Math.PI * 2
  );

  ctx.fill();

  // =====================
  // ENEMY
  // =====================

  ctx.fillStyle =
    COLORS.enemy;

  ctx.beginPath();

  ctx.arc(

    gameState
      .shadowHunter.x *
      TILE_SIZE +

      TILE_SIZE / 2,

    gameState
      .shadowHunter.y *
      TILE_SIZE +

      TILE_SIZE / 2,

    10,

    0,

    Math.PI * 2
  );

  ctx.fill();
}