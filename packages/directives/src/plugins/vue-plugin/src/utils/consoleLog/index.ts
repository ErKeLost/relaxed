import { log, featLog, debugLog } from './src/log'
import { isVue3 } from '../../compatible/vue/isVue3'
const logKeys: any = {
  log,
  debugLog,
  featLog
}
export default function (app: any) {
  if (isVue3(app)) {
    Object.keys(logKeys).forEach((item) => {
      app.config.globalProperties[item] = logKeys[item]
    })
  } else {
    Object.keys(logKeys).forEach((item) => {
      app.prototype[item] = logKeys[item]
    })
  }
}
