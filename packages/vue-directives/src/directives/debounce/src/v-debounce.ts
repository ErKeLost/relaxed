import { getHooks } from '../../../compatible/vue/hookKey'
import debounce from './debounce-directive'
import { App } from 'vue'
import { Plugin } from 'vue'
import {
  DEFAULT_PLUGIN_OPTIONS,
  IVDrbouncePluginOption
} from '../types/options'
export const VDebounceDirective = (app: any) => {
  const hooks = getHooks(app)
  const globalOptions = {
    ...DEFAULT_PLUGIN_OPTIONS
  }
  app.directive(globalOptions.directive, {
    [hooks.mounted](el: HTMLElement, { value }: any) {
      debounce(
        value.event,
        el,
        value.delay,
        value.callback,
        value.headExecution
      )
    }
  })
}
interface Vue2 {
  default: {
    version: string
  }
}
export const VDebounce = {
  install: function (app: App | Vue2, options: any) {
    VDebounceDirective(app)
  }
} as Plugin & {
  installed: boolean
}
