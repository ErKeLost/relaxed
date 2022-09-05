// es5 deepclone

const deepClone = function (origin: any, target: any) {
  // edge cases
  // 创建返回深拷贝对象
  var tar = target || {}
  // 判断对象类型
  var toStr = Object.prototype.toString
  // 判断对象类型是否为数组
  var ARRAY_TYPE = '[object Array]'
  // 循环源对象
  for (var key in origin) {
    // 判断是否为自己的属性 不是原型上的
    if (origin.hasOwnProperty(key)) {
      // 如果对象中的属性还是对象 执行递归深拷贝
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        // 判断 生成 数组 还是对象
        tar[key] = toStr.call(origin[key]) === ARRAY_TYPE ? [] : {}
        // 递归调用
        deepClone(origin[key], tar[key])
      } else {
        // 赋值
        tar[key] = origin[key]
      }
    }
  }
  return tar
}

// es6 deepclone

export default deepClone
