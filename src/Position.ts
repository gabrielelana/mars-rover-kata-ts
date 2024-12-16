export class Position {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  toHash(): string {
    return `${this.x}-${this.y}`
  }

  static zero() {
    return new Position(0, 0)
  }

  static at(x: number, y: number) {
    return new Position(x, y)
  }
}
