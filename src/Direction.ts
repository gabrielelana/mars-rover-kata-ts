import assert from 'node:assert'

const Directions = ['N', 'E', 'S', 'W'] as const
type DirectionValue = (typeof Directions)[number]
export class Direction {
  constructor(public readonly value: DirectionValue) {}

  rotateLeft(): Direction {
    let index = Directions.indexOf(this.value)
    if (index === 0) {
      index = Directions.length
    }
    const direction = Directions[index - 1]
    assert(direction)
    return new Direction(direction)
  }

  rotateRight(): Direction {
    const index = Directions.indexOf(this.value)
    const direction = Directions[(index + 1) % Directions.length]
    assert(direction)
    return new Direction(direction)
  }

  public static NORTH = new Direction('N')
  public static EAST = new Direction('E')
  public static SOUTH = new Direction('S')
  public static WEST = new Direction('W')
}
