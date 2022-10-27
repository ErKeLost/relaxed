export function useStrategy(fun: any, ...args: any) {
  try {
    const action = [...fun()]
    const res = action.map((item) => item[0])
    const allCondition = res.map((item) => Object.values(item))
    const currentCondition = allCondition.filter((item) => scalarArrayEquals(item, [...args]))
    const [arr] = currentCondition
    let ind: number
    allCondition.forEach((item, index) => {
      const result = item.every((_i, index) => item[index] === arr[index])
      if (result) {
        ind = index
      }
    })
    const currentActions = action[ind]
    ;[currentActions].forEach(([, value]) => {
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
