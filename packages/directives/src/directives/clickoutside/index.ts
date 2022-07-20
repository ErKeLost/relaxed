import { getHooks } from '../../compatible/vue/hookKey'
import { App, Plugin } from 'vue'
import { clickoutside, deleteClickOutside } from './src/v-clickoutside'
import { DEFAULT_PLUGIN_OPTIONS } from './src/options'

const VClickOutSideDirective = (app: any) => {
  const hooks = getHooks(app)
  const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS }
  app.directive(globalOptions.directive, {
    [hooks.mounted](el: HTMLElement, { value }: any) {
      clickoutside(el, value)
    },
    [hooks.updated](el: HTMLElement, { value }: any) {
      clickoutside(el, value)
    },
    [hooks.unMounted]() {
      deleteClickOutside()
    }
  })
}
interface Vue2 {
  default: {
    version: string
  }
}
export const VClickoutside = {
  install: function (app: App | Vue2, options: any) {
    VClickOutSideDirective(app) // 点击outside
  }
} as Plugin & { installed: boolean }
export default VClickOutSideDirective
