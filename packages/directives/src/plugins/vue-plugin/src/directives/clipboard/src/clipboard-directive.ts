import ClipboardJS from 'clipboard'
import { App, Plugin } from 'vue'
import type { ObjectDirective } from 'vue'
import { getHooks } from '../../../compatible/vue/hookKey'

interface Vue2 {
  default: {
    version: string
  }
}
interface ClipboardOptions {
  /** Fixes IE by appending element to body */
  appendToBody: boolean
  autoSetContainer: boolean
}
export const VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true // This fixes IE, see #50
}
export const VClipBoardDirective = (app: App) => {
  const hooks = getHooks(app)
  app.directive('copy', {
    [hooks.mounted](el: any, binding: any) {
      if (binding.arg === 'success') {
        el._vClipboard_success = binding.value
      } else if (binding.arg === 'error') {
        el._vClipboard_error = binding.value
      } else {
        const clipboard = new ClipboardJS(el, {
          text: () => binding.value,
          action: () => (binding.arg === 'cut' ? 'cut' : 'copy'),
          container: VueClipboardConfig.autoSetContainer ? el : undefined
        })
        clipboard.on('success', (e) => {
          const callback = el._vClipboard_success
          typeof callback === 'function' && callback(e)
        })
        clipboard.on('error', (e) => {
          const callback = el._vClipboard_error
          typeof callback === 'function' && callback(e)
        })
        el._vClipboard = clipboard
      }
    },
    [hooks.updated](el: any, binding: any) {
      if (binding.arg === 'success') {
        el._vClipboard_success = binding.value
      } else if (binding.arg === 'error') {
        el._vClipboard_error = binding.value
      } else {
        el._vClipboard.text = () => binding.value
        el._vClipboard.action = () => (binding.arg === 'cut' ? 'cut' : 'copy')
      }
    },
    [hooks.unMounted](el: any, binding: any) {
      if (binding.arg === 'success') {
        delete el._vClipboard_success
      } else if (binding.arg === 'error') {
        delete el._vClipboard_error
      } else {
        el._vClipboard.destroy()
        delete el._vClipboard
      }
    }
  })
}

export const toClipboard = (text: string, action: any = 'copy'): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new ClipboardJS(fakeElement, {
      text: () => text,
      action: () => action
    })

    clipboard.on('success', (e) => {
      clipboard.destroy()
      resolve(e)
    })

    clipboard.on('error', (e) => {
      clipboard.destroy()
      reject(e)
    })

    if (VueClipboardConfig.appendToBody) {
      document.body.appendChild(fakeElement)
    }

    fakeElement.click()
    if (VueClipboardConfig.appendToBody) {
      document.body.removeChild(fakeElement)
    }
  })
}

export const VClipBoard = {
  install: function (app: App | Vue2, options: any) {
    VClipBoardDirective(app) // 点击outside
  }
} as Plugin & { installed: boolean }
