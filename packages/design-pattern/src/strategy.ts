export function useStrategy(aaa: any, ...args: any) {
  try {
    const action = [...aaa()]
    const res = action.map((item) => item[0])
    const b = res.map((item) => Object.values(item))
    const c = b.filter((item) => scalarArrayEquals(item, [...args]))
    const [arr] = c
    let ind: number
    b.forEach((item, oo) => {
      const result = item.every((_i, index) => item[index] === arr[index])
      if (result) {
        ind = oo
      }
    })
    const d = action[ind]
    ;[d].forEach(([, value]) => {
      // eslint-disable-next-line no-invalid-this
      value.call(this)
    })
  } catch (err) {
    console.warn('@relaxed/design-pattern 参数传递错误', err)
  }
}
function scalarArrayEquals(array1, array2) {
  return array1.length === array2.length && array1.every((v, i) => v === array2[i])
}
