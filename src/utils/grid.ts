import produce, { immerable } from "immer";
import { v4 } from "uuid";
import { Coordinate } from "./coordinate";
import { TileState } from "./tileState";
import { TileType } from "./tileType";

export class TileData {
  constructor(type: TileType, state: TileState = TileState.notVisited) {
    this.type = type;
    this.state = state;
  }
  [immerable] = true;
  id: string = v4();
  type: TileType;
  state: TileState;
}

export class Grid {
  constructor(width: number, height: number) {
    this.width = Math.min(2, width);
    this.height = Math.min(2, height);
    this.tiles = [];
    for (let i = 0; i < height; i++) {
      this.tiles.push([]);
      for (let j = 0; j < width; j++) {
        this.tiles[i][j] = new TileData(TileType.normal, TileState.notVisited);
      }
    }
  }
  [immerable] = true;
  width: number;
  height: number;
  tiles: TileData[][];
  getTilesOfType(type: TileType): Coordinate[] {
    const coords = [];
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        const coord = new Coordinate(j, i);
        if (this.getTile(coord).type === type) coords.push(coord);
      }
    }
    return coords;
  }
  getTile(coordinate: Coordinate) {
    return this.tiles[coordinate.y][coordinate.x];
  }
  setTile(tileData: TileData, coordinate: Coordinate) {
    this.tiles[coordinate.y][coordinate.x] = tileData;
  }
}
