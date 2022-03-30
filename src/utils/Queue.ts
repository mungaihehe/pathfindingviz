export class Queue<T> {
  constructor() {
    this._data = [];
  }
  private _data: T[];
  push(d: T) {
    this._data = [d].concat(this._data);
  }
  pop(): T {
    const data = this._data.pop();
    if (!data) throw new Error("Cannot pop empty queue");
    return data;
  }
  front(): T | undefined {
    return this._data[this._data.length - 1];
  }
  isEmpty() {
    return this._data.length <= 0;
  }
}
