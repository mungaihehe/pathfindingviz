import { Coordinate } from "./coordinate";
import { TileState } from "./tileState";

export class Animation {
  constructor(coordinate: Coordinate, state: TileState) {
    this.coordinate = coordinate;
    this.state = state;
  }
  coordinate: Coordinate;
  state: TileState;
}
