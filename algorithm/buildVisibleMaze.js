import {
  TILE_TYPES,
} from "../data/constants.js";

export function buildVisibleMaze(
  maze
) {
  return maze.map((row) =>
    row.map((cell) => {
      // unknown cells
      if (
        !cell.discovered
      ) {
        return {
          ...cell,

          type:
            TILE_TYPES.WALL,
        };
      }

      return cell;
    })
  );
}