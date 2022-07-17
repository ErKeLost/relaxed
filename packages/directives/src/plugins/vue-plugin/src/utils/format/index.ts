import { isVue3 } from '../../compatible/vue/isVue3'
import { formatUtc } from './src/formatUtc'
export default function (app: any) {
  if (isVue3(app)) {
    app.config.globalProperties.$format = formatUtc
  } else {
    app.prototype.$format = formatUtc
  }
}
