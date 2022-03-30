import { Grid } from "../grid";

export abstract class TileChanger {
  abstract change(grid: Grid): Grid;
}
