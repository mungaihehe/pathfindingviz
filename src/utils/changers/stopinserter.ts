import produce from "immer";
import { Coordinate } from "../coordinate";
import { Grid, TileData } from "../grid";
import { TileState } from "../tileState";
import { TileType } from "../tileType";
import { TileChanger } from "./tilechanger";

export class StopInserter extends TileChanger {
  constructor(coordinate: Coordinate) {
    super();
    this.coordinate = coordinate;
  }
  coordinate: Coordinate;
  change(grid: Grid): Grid {
    let currentStartCoordinate = new Coordinate(-1, -1);
    let currentStopCoordinate = new Coordinate(-2, -2);

    for (let i = 0; i < grid.tiles.length; i++) {
      for (let j = 0; j < grid.tiles[i].length; j++) {
        const tile = grid.tiles[i][j];
        if (tile.type === TileType.start) {
          currentStartCoordinate = new Coordinate(j, i);
          continue;
        } else if (tile.type === TileType.stop) {
          currentStopCoordinate = new Coordinate(j, i);
          continue;
        }
      }
    }
    if (this.coordinate.isEqualTo(currentStopCoordinate)) return grid;
    if (this.coordinate.isEqualTo(currentStartCoordinate))
      return produce(grid, (draft) => {
        draft.setTile(
          new TileData(TileType.stop, TileState.notVisited),
          currentStartCoordinate
        );
        draft.setTile(
          new TileData(TileType.start, TileState.notVisited),
          currentStopCoordinate
        );
      });
    return produce(grid, (draft) => {
      currentStopCoordinate.isValidInGrid(draft) &&
        draft.setTile(new TileData(TileType.normal), currentStopCoordinate);
      draft.setTile(new TileData(TileType.stop), this.coordinate);
    });
  }
}
