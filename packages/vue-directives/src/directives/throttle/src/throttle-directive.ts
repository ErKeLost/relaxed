const throttle = (event: keyof HTMLElementEventMap = 'click', el: HTMLElement, delay: number = 1000, callback: () => void) => {
  el.addEventListener(event, (...arg) => {
    let lastTime: number = 0
    const nowTime = new Date().getTime()
    let remainTime = delay - (nowTime - lastTime)

    if (remainTime <= 0) {
      callback()
      lastTime = nowTime
    }
  })
}

export { throttle }
