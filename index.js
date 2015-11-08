import ms from 'simple-modular-scale'
import { addIndex, curry, flatten, head, map, pipe, tap } from 'ramda'

const mapIndexed = addIndex(map)
const log = tap(console.log)
const spaces = [.5, 1, 2, 4, 8]

const all = curry((property, size, index) => {
  const prefix = head(property)
  return `.${prefix}${index}  { ${property}: ${size}rem; }`
})

const rotation = curry((property, size, index) => {
  const prefix = head(property)
  return [
    `.${prefix}t${index}  { ${property}-top: ${size}rem; }`,
    `.${prefix}r${index}  { ${property}-right: ${size}rem; }`,
    `.${prefix}b${index}  { ${property}-bottom: ${size}rem; }`,
    `.${prefix}l${index}  { ${property}-left: ${size}rem; }`
  ]
})

const axes = curry((property, size, index) => {
  const prefix = head(property)

  return [
    `.${prefix}y${index} { ${property}-top: ${size}rem; ${property}-bottom: ${size}rem; }`,
    `.${prefix}x${index} { ${property}-right: ${size}rem; ${property}-left: ${size}rem; }`,
  ]
})

const negatives = curry((property, size, index) => {
  const prefix = head(property)

  return [
    `.${prefix}xn${index} { ${property}-right: ${-size}rem; ${property}-left: ${-size}rem; }`,
  ]
})

const assemble = curry((property, transformers, size, index) => {
  const result = pipe(
    map((t) => t(property, size, index))
  )(transformers)

  return result
})

const mxs = pipe(
  mapIndexed(assemble('margin', [all, rotation, negatives])),
  flatten,
  log
)(spaces)

const pxs = pipe(
  mapIndexed(assemble('padding', [all, axes])),
  flatten,
  log
)(spaces)


// const scale = ms({
//   base: 16,
//   ratios: [3/2, 4/3],
//   length: 8
// })
//
// console.log(scale)
