import produce from "immer";
import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { ShortestPathAlgorithm } from "../utils/algorithms";
import { bfs } from "../utils/algorithms/bfs";
import { Animation } from "../utils/animation";
import { Coordinate } from "../utils/coordinate";
import { Grid } from "../utils/grid";
import { GridState, StateType } from "../utils/state/gridState";
import { TileState } from "../utils/tileState";
import { TileType } from "../utils/tileType";
import { TileSwitch } from "./TileSwitch";
import { TileTypeChanger } from "./TileTypeChanger";
const algorithmMap = {
  [ShortestPathAlgorithm.bfs]: bfs,
  [ShortestPathAlgorithm.dijkstras]: () => [] as Animation[],
  [ShortestPathAlgorithm.dfs]: () => [] as Animation[],
};
interface GridProps {
  grid: Grid;
  onChange: (grid: Grid) => any;
  selectedAlgorithm: ShortestPathAlgorithm;
  state: GridState;
  nextState: () => any;
  prevState: () => any;
}

export const GridView: FC<GridProps> = ({
  grid,
  onChange,
  selectedAlgorithm,
  state,
  nextState,
  prevState,
}) => {
  const tileRefs = useRef<any[][]>(
    new Array(grid.tiles.length)
      .fill(null)
      .map(() => new Array(grid.tiles[0].length).fill(null))
  );
  useEffect(() => {
    const timeOuts: NodeJS.Timeout[] = [];
    if (state.type === StateType.playing) {
      const [start] = grid.getTilesOfType(TileType.start);
      const [stop] = grid.getTilesOfType(TileType.stop);
      if (!start) {
        alert("Choose a starting position (A)");
        prevState();
        return;
      } else if (!stop) {
        alert("Choose a stop position (B)");
        prevState();
        return;
      }
      const animations = algorithmMap[selectedAlgorithm](grid, start, stop);

      animations.forEach(({ coordinate, state }, index) => {
        const timeOut = setTimeout(() => {
          switch (state) {
            case TileState.visited:
              tileRefs.current[coordinate.y][
                coordinate.x
              ].style.backgroundColor = "#f59e0b";
              break;
            case TileState.path:
              tileRefs.current[coordinate.y][
                coordinate.x
              ].style.backgroundColor = "#84cc16";
              break;
            default:
              console.log("Invalid state");
              break;
          }
        }, 50 * (index + 1));
        timeOuts.push(timeOut);
      });
      timeOuts.push(
        setTimeout(() => {
          nextState();
        }, animations.length * 60)
      );
    }
    return () => {
      timeOuts.forEach(clearTimeout);
    };
  }, [state]);
  return (
    <div className="flex flex-col">
      {grid.tiles.map((row, yIndex) => {
        return (
          <div className="flex items-center gap-1" key={yIndex}>
            {row.map((tileData, xIndex) => (
              <TileTypeChanger
                key={tileData.id}
                onChange={(changer) => {
                  onChange(changer.change(grid));
                }}
                coordinate={new Coordinate(xIndex, yIndex)}
              >
                <TileSwitch
                  tileData={tileData}
                  ref={(node: any) => {
                    if (!tileRefs.current[yIndex]) {
                      tileRefs.current[yIndex] = [];
                    }
                    tileRefs.current[yIndex][xIndex] = node;
                  }}
                />
              </TileTypeChanger>
            ))}
          </div>
        );
      })}
    </div>
  );
};
