import { getHooks } from '../../../compatible/vue/hookKey'
import { throttle } from './throttle-directive'
import { App } from 'vue'
// import { DEFAULT_PLUGIN_OPTIONS, IVDrbouncePluginOption } from './options'
const VThrottleDirective = (app: any) => {
  const hooks = getHooks(app)
  // const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS }
  app.directive('throttle', {
    [hooks.mounted](el: HTMLElement, { value }: any) {
      throttle(value.event, el, value.delay, value.callback)
    }
  })
}
import { Plugin } from 'vue'
interface Vue2 {
  default: {
    version: string
  }
}
export const VThrottle = {
  install: function (app: App | Vue2, options: any) {
    VThrottleDirective(app) // 点击outside
  }
} as Plugin & {
  installed: boolean
}
export default VThrottleDirective
