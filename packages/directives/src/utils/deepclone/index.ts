import { isVue3 } from '../../compatible/vue/isVue3'
import deepClone from './src/deepClone'
export default function (app: any) {
  if (isVue3(app)) {
    app.config.globalProperties.$deepClone = deepClone
  } else {
    app.prototype.$deepClone = deepClone
  }
}
