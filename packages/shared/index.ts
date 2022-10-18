// 是否为数组
export const isArray = Array.isArray
// 判断类型
export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)
// 是否为map
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'
// 是否为set
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'
// 是否日期
export const isDate = (val: unknown): val is Date => val instanceof Date
// 是否函数
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
// 是否string
export const isString = (val: unknown): val is string => typeof val === 'string'
// 是否symbol
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
// 是否object
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1)
}

export const isHTMLElement = (val: unknown) => toRawType(val).startsWith('HTML')
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isNull = (val: unknown) => val === null
export const isDef = (val: unknown) => val === undefined

export const isEmpty = (val: unknown) => {
  return (
    (!val && val !== 0 && val !== '') ||
    (isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  )
}
