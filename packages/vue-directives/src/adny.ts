import { App, Plugin } from 'vue'
import logUtil from './utils/consoleLog/index'
import formatUtil from './utils/format/index'
import deepClone from './utils/deepclone'
import { VDebounceDirective } from './directives/debounce'
import VPermissionDirective from './directives/permission'
import VClickOutSideDirective from './directives/clickoutside'
import { VRippleDirective } from './directives/ripple/src/ripple-directive'
import { VFormatTimeDirective } from './directives/formattime'
import { VClipBoardDirective } from './directives/clipboard/src/clipboard-directive'
import VThrottleDirective from './directives/throttle/src/v-throttle'
import VLongPressDirective from './directives/longpress/src/longpress'
interface Vue2 {
  default: {
    version: string
  }
}

const Adny = {
  install: function (app: App | Vue2, options: any) {
    logUtil(app) // log工具函数
    formatUtil(app) // 时间格式化工具函数
    deepClone(app) // es5 深拷贝
    VDebounceDirective(app) // 防抖工具函数
    VPermissionDirective(app) // 权限工具函数
    VClickOutSideDirective(app) // 点击outside
    VRippleDirective(app) // 水波纹
    VClipBoardDirective(app) // 粘贴板
    VThrottleDirective(app) // 节流
    VLongPressDirective(app) // 长按
    VFormatTimeDirective(app) // 格式化时间
  }
} as Plugin & {
  installed: boolean
}

export default Adny
