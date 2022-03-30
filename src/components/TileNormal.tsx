import { FC, forwardRef } from "react";
import { TileState } from "../utils/tileState";
import { TileType } from "../utils/tileType";

interface TileProps {
  state: TileState;
  //   type: TileType;
  //   onChange: (type: TileType) => any;
}

export const TileNormal = forwardRef<any, TileProps>(({ state }, ref) => {
  const color = () => {
    switch (state) {
      case TileState.notPath:
        return "bg-rose-500";
      case TileState.path:
        return "bg-green-500";
      case TileState.visited:
        return "bg-amber-500";
      case TileState.notVisited:
        return "bg-neutral-500";
      default:
        return "";
    }
  };
  return <div className={`w-5 h-5 m-1 ${color()}`} ref={ref}></div>;
});
