import type { Direction } from './Direction'
import type { Position } from './Position'
import type { Rover } from './Rover'
import { unreacheable } from './utils'

const Commands = ['L', 'R', 'F'] as const
type Command = (typeof Commands)[number]

export class Driver {
  constructor(private readonly rover: Rover) {}

  execute(input: string): [Position, Direction] {
    for (const char of input) {
      const command = char as Command
      switch (command) {
        case 'F':
          this.rover.forward()
          break
        case 'L':
          this.rover.turnLeft()
          break
        case 'R':
          this.rover.turnRight()
          break
        default:
          unreacheable(command)
      }
    }
    return [this.rover.at, this.rover.facing]
  }
}
