import { getAdjacent } from "../adjacent";
import { Animation } from "../animation";
import { Coordinate } from "../coordinate";
import { Grid } from "../grid";
import { Queue } from "../Queue";
import { TileState } from "../tileState";

export function bfs(
  grid: Grid,
  start: Coordinate,
  stop: Coordinate
): Animation[] {
  const animations: Animation[] = [];
  const q = new Queue<{ coordinate: Coordinate; path: Coordinate[] }>();
  const visited = grid.tiles.map((row) => {
    return row.map((tile) => false);
  });
  visited[start.y][start.x] = true;
  q.push({ coordinate: start, path: [] });

  while (!q.isEmpty()) {
    const p = q.pop();
    const { coordinate: u, path } = p;
    const adjacent = getAdjacent(grid, u);
    for (const v of adjacent) {
      if (v.isEqualTo(stop)) {
        return animations.concat(
          path.concat([u, v]).map((p) => new Animation(p, TileState.path))
        );
      }
      if (visited[v.y][v.x]) continue;
      visited[v.y][v.x] = true;
      animations.push(new Animation(v, TileState.visited));
      q.push({ coordinate: v, path: path.concat(u) });
    }
  }
  return animations;
}
