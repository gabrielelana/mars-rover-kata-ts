import { describe, expect, it } from '@jest/globals'
import * as fc from 'fast-check'
import { Direction, Driver, Grid, Position, Rover } from './../../src'

describe('Direction', () => {
  it('can rotate left', () => {
    expect(Direction.WEST).toStrictEqual(Direction.NORTH.rotateLeft())
    expect(Direction.SOUTH).toStrictEqual(Direction.WEST.rotateLeft())
    expect(Direction.EAST).toStrictEqual(Direction.SOUTH.rotateLeft())
    expect(Direction.NORTH).toStrictEqual(Direction.EAST.rotateLeft())
  })
  it('can rotate right', () => {
    expect(Direction.EAST).toStrictEqual(Direction.NORTH.rotateRight())
    expect(Direction.NORTH).toStrictEqual(Direction.WEST.rotateRight())
    expect(Direction.WEST).toStrictEqual(Direction.SOUTH.rotateRight())
    expect(Direction.SOUTH).toStrictEqual(Direction.EAST.rotateRight())
  })
})

describe('Rover', () => {
  describe('start', () => {
    it('will be created at position zero', () => {
      const rover = Rover.start()
      expect(rover.at).toStrictEqual(Position.zero())
    })

    it('will be created facing NORTH', () => {
      const rover = Rover.start()
      expect(rover.facing).toStrictEqual(Direction.NORTH)
    })
  })

  it('can turn left', () => {
    const rover = Rover.start()
    const initialDirection = rover.facing
    expect(initialDirection).toStrictEqual(Direction.NORTH)

    rover.turnLeft()
    expect(rover.facing).toStrictEqual(initialDirection.rotateLeft())
  })

  it('can turn right', () => {
    const rover = Rover.start()
    const initialDirection = rover.facing
    expect(initialDirection).toStrictEqual(Direction.NORTH)

    rover.turnRight()
    expect(rover.facing).toStrictEqual(initialDirection.rotateRight())
  })

  it('can go forward', () => {
    const rover = Rover.start()
    rover.forward()
    expect(rover.at).toStrictEqual(Position.at(0, 1))
  })

  it('should end up in the same place after a square', () => {
    const ArbitraryInput = fc.array(fc.oneof(fc.constant('F'), fc.constant('R'), fc.constant('L')))
    fc.assert(
      fc.property(ArbitraryInput, fc.nat(10), (input, length) => {
        const rover = Rover.start()
        const driver = new Driver(rover)
        const afterInput = driver.execute(input.join(''))

        const squareRight = ['F'.repeat(length), 'R'].join('').repeat(4)
        const afterSquareRight = driver.execute(squareRight)

        const squareLeft = ['F'.repeat(length), 'L'].join('').repeat(4)
        const afterSquareLeft = driver.execute(squareLeft)

        expect(afterInput).toStrictEqual(afterSquareRight)
        expect(afterInput).toStrictEqual(afterSquareLeft)
      }),
    )
  })

  it('should wrap around at the edge of the grid', () => {
    const grid = new Grid(10, 10)
    const rover = new Rover(Position.at(9, 9), Direction.NORTH, grid)
    rover.forward()
    expect(rover.at).toStrictEqual(Position.at(9, 0))
  })

  it('should stop at obstacles', () => {
    const grid = new Grid().obstacleAt(Position.at(0, 1))
    const rover = new Rover(Position.zero(), Direction.NORTH, grid)
    expect(() => rover.forward()).toThrow()
  })

  it('should report the entire path of the rover', () => {
    const grid = new Grid()
    const rover = new Rover(Position.zero(), Direction.NORTH, grid)
    const expectedPath = [Position.zero(), Position.at(0, 1), Position.at(1, 1), Position.at(2, 1)]
    rover.forward()
    expect(rover.at).toStrictEqual(expectedPath[1])
    rover.turnRight()
    expect(rover.at).toStrictEqual(expectedPath[1])
    rover.forward()
    expect(rover.at).toStrictEqual(expectedPath[2])
    rover.forward()
    expect(rover.at).toStrictEqual(expectedPath[3])
    expect(rover.pathSoFar).toStrictEqual(expectedPath)
  })
})
