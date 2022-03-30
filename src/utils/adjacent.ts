import { Coordinate } from "./coordinate";
import { Grid } from "./grid";

const directions = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
export function getAdjacent(grid: Grid, coordinate: Coordinate) {
  const coords = [];
  for (const [row, col] of directions) {
    const newCoord = new Coordinate(coordinate.x + col, coordinate.y + row);
    if (newCoord.isValidInGrid(grid)) coords.push(newCoord);
  }
  return coords;
}
