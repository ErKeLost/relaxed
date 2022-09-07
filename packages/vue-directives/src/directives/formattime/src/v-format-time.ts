import { getHooks } from '../../../compatible/vue/hookKey'
import { App } from 'vue'
import { Plugin } from 'vue'
import { formatTimeMounted, formatTimeCreated } from './format-time-directive'
interface Vue2 {
  default: {
    version: string
  }
}
export const VFormatTimeDirective = (app: App) => {
  const hooks = getHooks(app)
  app.directive('format-time', {
    [hooks.created](el: HTMLElement, binding: any) {
      formatTimeCreated(el, binding)
    },
    [hooks.mounted](el: HTMLElement, binding: any) {
      formatTimeMounted(el, binding)
    },
    [hooks.updated](el: HTMLElement, binding: any) {
      console.log('时间数据发生动态改变~')
    }
  })
}

export const VFormatTime = {
  install: function (app: App | Vue2, options: any) {
    VFormatTimeDirective(app) // 点击outside
  }
} as Plugin & {
  installed: boolean
}
