export function unreacheable(x: never): never {
  throw new Error(`Unreacheable but got: ${x}`)
}
