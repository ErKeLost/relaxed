import { h } from 'vue'
import { VPTheme } from '@vue/theme'
import Banner from '../../../src/components/Banner.vue'
// uncomment to test CSS variables override
import './override.css'
export default {
  ...VPTheme,
  Layout() {
    return h(VPTheme.Layout, null, {
      // uncomment to test layout slots
      banner: () => h(Banner)
      // 'sidebar-top': () => h('div', 'hello top'),
      // 'sidebar-bottom': () => h('div', 'hello bottom'),
      // 'content-top': () => h('h1', 'Announcement!'),
      // 'content-bottom': () => h('div', 'Some ads'),
      // 'aside-top': () => h('div', 'this could be huge'),
      // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
      // 'aside-bottom': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
    })
  },
  enhanceApp({ app }) {}
}
