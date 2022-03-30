import { FinishedState } from "./finished";
import { GridState, StateType } from "./gridState";
import { PlayingState } from "./playing";

export class ReadyState extends GridState {
  constructor() {
    super(StateType.ready);
  }
  next(): GridState {
    return new PlayingState();
  }
  prev(): GridState {
    return new FinishedState();
  }
}
