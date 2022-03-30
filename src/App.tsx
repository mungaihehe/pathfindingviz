import { useCallback, useEffect, useState } from "react";
import { GridView } from "./components/GridView";
import { SelectAlgorithm } from "./components/SelectAlgorithm";
import { ShortestPathAlgorithm } from "./utils/algorithms";
import { Grid, TileData } from "./utils/grid";
import { GridState, StateType } from "./utils/state/gridState";
import { ReadyState } from "./utils/state/ready";
import { TileType } from "./utils/tileType";
import { useWindowDimensions } from "./utils/windowDimensions";

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    ShortestPathAlgorithm.dijkstras as ShortestPathAlgorithm
  );
  const { height, width } = useWindowDimensions();
  const generateGrid = useCallback((): Grid => {
    const h = Math.floor((height / 36) * 0.88);
    const w = Math.floor((width / 36) * 1);
    console.log(h, w);
    return new Grid(w, h);
  }, [height, width]);
  const [grid, setGrid] = useState(() => generateGrid());
  const [state, setState] = useState(new ReadyState() as GridState);

  useEffect(() => {
    console.log("here");
    setGrid(generateGrid());
  }, [height, width]);

  useEffect(() => {
    switch (state.type) {
      case StateType.ready:
        const [start] = grid.getTilesOfType(TileType.start);
        const [stop] = grid.getTilesOfType(TileType.stop);
        const newGrid = generateGrid();
        start && newGrid.setTile(new TileData(TileType.start), start);
        stop && newGrid.setTile(new TileData(TileType.stop), stop);

        setGrid(newGrid);
        break;
      case StateType.playing:
        break;
      case StateType.finished:
        break;
    }
  }, [state]);

  return (
    <div className="bg-neutral-900 min-h-screen text-white flex flex-col items-center">
      <main className="inline-flex mx-auto flex-col items-center">
        <nav className="flex flex-col md:flex-row items-center justify-between py-2 md:p-2 gap-2 md:gap-0 md:w-full">
          <h2 className="text-lg font-bold">Pathfinding Visualiser</h2>
          <div className="flex items-center gap-2">
            <SelectAlgorithm
              onSelect={setSelectedAlgorithm}
              selectedAlgorithm={selectedAlgorithm}
            />
            <button
              className="py-2 px-3 bg-violet-700 rounded-md"
              onClick={() => setState((p) => p.next())}
            >
              {(() => {
                switch (state.type) {
                  case StateType.ready:
                    return "Play";
                  case StateType.playing:
                    return "Playing";
                  case StateType.finished:
                    return "Reset";
                  default:
                    return "Invalid";
                }
              })()}
            </button>
          </div>
        </nav>
        <GridView
          grid={grid}
          onChange={setGrid}
          state={state}
          nextState={() => setState((p) => p.next())}
          prevState={() => setState((p) => p.prev())}
          selectedAlgorithm={selectedAlgorithm}
        />
      </main>
    </div>
  );
}

export default App;
