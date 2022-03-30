import { GridState, StateType } from "./gridState";
import { PlayingState } from "./playing";
import { ReadyState } from "./ready";

export class FinishedState extends GridState {
  constructor() {
    super(StateType.finished);
  }
  next(): GridState {
    return new ReadyState();
  }
  prev(): GridState {
    return new PlayingState();
  }
}
