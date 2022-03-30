import { Grid } from "./grid";

export class Coordinate {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  x: number;
  y: number;
  isEqualTo(coordinate: Coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }
  isValidInGrid(grid: Grid) {
    return (
      this.x >= 0 &&
      this.y >= 0 &&
      this.x < grid.tiles[0].length &&
      this.y < grid.tiles.length
    );
  }
}
