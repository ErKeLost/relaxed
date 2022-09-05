/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.js'
declare module 'vue-adny'
declare let $store: any
declare let loadingCtor: any
declare const VUE_APP_BASE_URL: string
declare const VUE_APP_TIME_OUT: number
