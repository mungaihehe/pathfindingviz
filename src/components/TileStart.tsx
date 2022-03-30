import { FC, forwardRef } from "react";
import { TileState } from "../utils/tileState";
import { TileType } from "../utils/tileType";

interface TileStartProps {
  state: TileState;
  //   type: TileType;
  //   onChange: (type: TileType) => any;
}

export const TileStart = forwardRef<any, TileStartProps>(({ state }, ref) => {
  return (
    <div className={`w-5 h-5 m-1 bg-violet-500`} ref={ref}>
      A
    </div>
  );
});
