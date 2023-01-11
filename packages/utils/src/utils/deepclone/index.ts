function isObject(originValue) {
  return (
    (originValue !== null && typeof originValue === 'object') || typeof originValue === 'function'
  )
}
export function deepClone(originValue, map = new WeakMap()) {
  // 循环引用
  // const map = new Map();

  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }
  // if (originValue instanceof Set) {
  //   return new Set([...originValue]);
  // }
  // if (originValue instanceof Map) {
  //   return new Map([...originValue]);
  // }

  if (typeof originValue === 'function') {
    return originValue
  }
  if (!isObject(originValue)) {
    return originValue
  }
  if (map.has(originValue)) {
    return map.get(originValue)
  }
  const target = Array.isArray(originValue) ? [] : {}
  map.set(originValue, target)
  for (const key in originValue) {
    target[key] = deepClone(originValue[key], map)
  }
  // 对 symbol 进行特殊处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const skey of symbolKeys) {
    target[skey] = deepClone(originValue[skey], map)
  }
  return target
}

export function deepCloneSync(originObj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(originObj)
    port2.onmessage = (msg) => {
      resolve(msg.data)
    }
  })
}
