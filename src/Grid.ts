import { Position } from './Position'

export class Grid {
  constructor(
    private readonly width: number = 10,
    private readonly height: number = 10,
    private readonly obstacles: Set<string> = new Set(),
  ) {}

  obstacleAt(at: Position): Grid {
    this.obstacles.add(at.toHash())
    return this
  }

  private checkForObstacles(at: Position): Position {
    if (this.obstacles.has(at.toHash())) {
      throw new Error('hit an obstacle')
    }
    return at
  }

  up(at: Position): Position {
    return this.checkForObstacles(Position.at(at.x, (at.y + 1) % this.height))
  }

  right(at: Position): Position {
    return this.checkForObstacles(Position.at((at.x + 1) % this.width, at.y))
  }

  down(at: Position): Position {
    let y = at.y
    if (y <= 0) {
      y = this.height
    }
    return this.checkForObstacles(Position.at(at.x, (y - 1) % this.height))
  }

  left(at: Position): Position {
    let x = at.x
    if (x <= 0) {
      x = this.width
    }
    return this.checkForObstacles(Position.at((x - 1) % this.width, at.y))
  }
}
