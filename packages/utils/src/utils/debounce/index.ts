function debounce(
  fn,
  delay: number = 1000,
  headExection: boolean = false,
  resCallback: (any) => void
) {
  let timer = null
  let isInvoke = false
  // 我们需要返回一个函数
  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      // 判断是否需要立即执行
      if (headExection && !isInvoke) {
        const result = fn.apply(this, args)
        if (resCallback && typeof resCallback === 'function') resCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resCallback && typeof resCallback === 'function') resCallback(result)
          resolve(result)
          isInvoke = false
        }, delay)
      }
    })
  }
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
  }
  return _debounce
}

export { debounce }
