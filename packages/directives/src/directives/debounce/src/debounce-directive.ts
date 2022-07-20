// 头部执行  尾部执行
const debounce = (
  event: keyof HTMLElementEventMap = 'click',
  el: HTMLElement,
  delay: number = 1000,
  callback: (any) => void,
  // 头部执行 尾部执行 默认头部执行
  headExecution: boolean = false
) => {
  let timer: any
  let isInvoke = false
  el.addEventListener(event, (...arg) => {
    if (timer) {
      clearTimeout(timer)
    }
    if (headExecution && !isInvoke) {
      callback.apply(this, arg)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        !headExecution && callback.apply(this, arg)
        isInvoke = false
      }, delay)
    }
  })
}
export default debounce
