export function revealCells(
  maze,
  playerX,
  playerY,
  radius
) {
  for (
    let y = playerY - radius;
    y <= playerY + radius;
    y++
  ) {
    for (
      let x = playerX - radius;
      x <= playerX + radius;
      x++
    ) {
      if (
        y < 0 ||
        x < 0 ||
        y >= maze.length ||
        x >= maze[0].length
      ) {
        continue;
      }

      maze[y][x].discovered = true;
    }
  }

  maze[playerY][playerX].visited = true;
}