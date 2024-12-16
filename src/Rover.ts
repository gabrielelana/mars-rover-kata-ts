import { Direction } from './Direction'
import { Grid } from './Grid'
import { Position } from './Position'
import { unreacheable } from './utils'

export class Rover {
  private path: Position[]

  constructor(
    private position: Position,
    private direction: Direction,
    private grid: Grid = new Grid(),
  ) {
    this.path = [this.position]
  }

  get at(): Position {
    return this.position
  }

  get facing(): Direction {
    return this.direction
  }

  get pathSoFar(): Position[] {
    return this.path
  }

  turnLeft() {
    this.direction = this.direction.rotateLeft()
  }

  turnRight() {
    this.direction = this.direction.rotateRight()
  }

  forward() {
    switch (this.direction.value) {
      case 'N':
        this.position = this.grid.up(this.position)
        break
      case 'E':
        this.position = this.grid.right(this.position)
        break
      case 'S':
        this.position = this.grid.down(this.position)
        break
      case 'W':
        this.position = this.grid.left(this.position)
        break
      default:
        unreacheable(this.direction.value)
    }
    this.path.push(this.position)
  }

  static start() {
    return new Rover(Position.zero(), Direction.NORTH)
  }
}
