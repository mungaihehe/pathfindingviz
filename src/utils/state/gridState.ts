export abstract class GridState {
  constructor(type: StateType) {
    this.type = type;
  }
  type: StateType;
  abstract next(): GridState;
  abstract prev(): GridState;
}

export enum StateType {
  ready,
  playing,
  finished,
}
