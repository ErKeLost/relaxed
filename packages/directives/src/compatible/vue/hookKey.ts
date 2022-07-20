import { App } from 'vue'
import { isVue3 } from './isVue3'

const getHooks = (app: App) => {
  return isVue3(app)
    ? {
        created: 'created',
        mounted: 'mounted',
        updated: 'updated',
        unMounted: 'unmounted'
      }
    : {
        created: 'bind',
        mounted: 'inserted',
        updated: 'updated',
        unMounted: 'unbind'
      }
}

export { getHooks }
