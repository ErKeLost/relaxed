export const toString = Object.prototype.toString()

// export function isArray(val: unknown): boolean {
//   return toString.call(val) === '[object Array]';
// }

// typeof null = "Object"

export function isUndefined(val: unknown): boolean {
  return typeof val === 'undefined'
}

// buffer
export function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    typeof val.constructor.isBuffer === 'function' &&
    val.constructor.isBuffer(val)
  )
}

export function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData
}

// export function isObject(val) {
//   return val !== null && typeof val === 'object'
// }
// 其实就是判断目标对象的原型是不是`null` 或 `Object.prototype`
export function isPlainObject(val) {
  if (Object.prototype.toString.call(val) !== '[object Object]') {
    return false
  }

  var prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}
// export function isDate(val) {
//   return Object.prototype.toString.call(val) === '[object Date]';
// }

export function isFile(val) {
  return Object.prototype.toString.call(val) === '[object File]'
}

export function isBlob(val) {
  return Object.prototype.toString.call(val) === '[object Blob]'
}

// export function isFunction(val) {
//   return Object.prototype.toString.call(val) === '[object Function]';
// }

// export function isStream(val) {
//   return isObject(val) && isFunction(val.pipe);
// }

export function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
}
