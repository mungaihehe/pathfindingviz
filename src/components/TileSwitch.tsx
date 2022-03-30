import { FC, forwardRef } from "react";
import { TileData } from "../utils/grid";
import { TileType } from "../utils/tileType";
import { TileNormal } from "./TileNormal";
import { TileStart } from "./TileStart";
import { TileStop } from "./TileStop";

interface TileSwitchProps {
  tileData: TileData;
}

export const TileSwitch = forwardRef<any, TileSwitchProps>(
  ({ tileData }, ref) => {
    switch (tileData.type) {
      case TileType.normal:
        return <TileNormal state={tileData.state} ref={ref} />;
      case TileType.start:
        return <TileStart state={tileData.state} ref={ref} />;
      case TileType.stop:
        return <TileStop state={tileData.state} ref={ref} />;
      default:
        return null;
    }
  }
);
