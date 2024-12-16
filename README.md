## Mars Rover Kata

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

Your task is to develop an API that moves the rovers around on the plateau.

In this API, the plateau is represented as a grid, and a rover has state
consisting of two parts:

- its position on the grid (represented by an X,Y coordinate pair)
- the compass direction it's facing (represented by a letter, one
  of `N`, `S`, `E`, `W`)

The input to the program is a string of one-character move commands:

- `L` and `R` rotate the direction the rover is facing
- `F` moves the rover one grid square forward in the direction it is currently
  facing

The output would be the final position and orientation of the rover after
executing all the commands

---

The grid is limited (ex. 10 x 10), when the rover reaches the end of the grid it
wraps around it

- (9,9) facing `N` -> `F` -> (9,0) facing `N`

---

The grid may have obstacles. If a given sequence of commands encounters an
obstacle, the rover stops and reports the fact

---

You need to report the entire path of the Rover as output, not only the final
state
