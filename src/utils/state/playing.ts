import { FinishedState } from "./finished";
import { GridState, StateType } from "./gridState";
import { ReadyState } from "./ready";

export class PlayingState extends GridState {
  constructor() {
    super(StateType.playing);
  }
  next(): GridState {
    return new FinishedState();
  }
  prev(): GridState {
    return new ReadyState();
  }
}
