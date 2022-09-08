import { getHooks } from '../../../compatible/hookKey'
import { App } from 'vue'

const VLongPressDirective = (app: App) => {
  const hooks = getHooks(app)
  app.directive('longpress', {
    [hooks.mounted](el: HTMLElement | any, { value: { fn, time } }: any) {
      //没绑定函数直接返回
      if (typeof fn !== 'function') return
      // 定义定时器变量
      el._timer = null
      // 创建计时器（ n秒后执行函数 ）
      el._start = (e) => {
        //e.type表示触发的事件类型如mousedown,touchstart等
        //pc端: e.button表示是哪个键按下0为鼠标左键，1为中键，2为右键
        //移动端: e.touches表示同时按下的键为个数
        if (
          (e.type === 'mousedown' && e.button && e.button !== 0) ||
          (e.type === 'touchstart' && e.touches && e.touches.length > 1)
        )
          return
        //定时长按n秒后执行事件
        if (el._timer === null) {
          el._timer = setTimeout(() => {
            fn()
          }, time)
          //取消浏览器默认事件，如右键弹窗
          el.addEventListener('contextmenu', function (e) {
            e.preventDefault()
          })
        }
      }
      // 如果两秒内松手，则取消计时器
      el._cancel = (e) => {
        if (el._timer !== null) {
          clearTimeout(el._timer)
          el._timer = null
        }
      }
      // 添加计时监听
      el.addEventListener('mousedown', el._start)
      el.addEventListener('touchstart', el._start)
      // 添加取消监听
      el.addEventListener('click', el._cancel)
      el.addEventListener('mouseout', el._cancel)
      el.addEventListener('touchend', el._cancel)
      el.addEventListener('touchcancel', el._cancel)
    },
    [hooks.unMounted](el: HTMLElement | any, { value }: any) {
      // 移除计时监听
      el.removeEventListener('mousedown', el._start)
      el.removeEventListener('touchstart', el._start)
      // 移除取消监听
      el.removeEventListener('click', el._cancel)
      el.removeEventListener('mouseout', el._cancel)
      el.removeEventListener('touchend', el._cancel)
      el.removeEventListener('touchcancel', el._cancel)
    }
  })
}
import { Plugin } from 'vue'
interface Vue2 {
  default: {
    version: string
  }
}
export const VLongPress = {
  install: function (app: App | Vue2, options: any) {
    VLongPressDirective(app) // 点击outside
  }
} as Plugin & {
  installed: boolean
}
export default VLongPressDirective
