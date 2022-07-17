function throttle(
  fn,
  interval: number = 1000,
  options: { leading: true; tailing: false; resCallback: (any) => any }
) {
  const { leading, tailing, resCallback } = options
  let lastTime = 0
  // 尾部执行时使用
  let timer = null
  function _throttle(...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        const result = fn.apply(this, args)
        resolve(result)
        if (resCallback) resCallback(result)
        lastTime = nowTime
        // 防止添加定时器
        return
      }
      if (tailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
          const result = fn.apply(this, args)
          resolve(result)
          if (resCallback) resCallback(result)
        }, remainTime)
      }
    })
  }
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }
  return _throttle
}
export { throttle }
