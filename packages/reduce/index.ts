function Accumulation(...val) {
  return val.reduce((t, v) => t + v, 0)
}

function Multiplication(...val) {
  return val.reduce((t, v) => t * v, 1)
}

export { Multiplication, Accumulation }
