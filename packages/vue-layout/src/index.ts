import type { App } from 'vue-demi'
import RelaxedLayout from './components/layout/index.vue'

function install(app: App) {
  app.component('RelaxedLayout', RelaxedLayout)
}

RelaxedLayout.install = install
RelaxedLayout.name = 'RelaxedLayout'
export interface LayoutProps {
  // 第三种布局 tab 不跟 header 一起变 的 顶部菜单布局
  tabMoveable?: boolean
  /** 布局模式 */
  mode?: 'vertical' | 'horizontal'
  /** 最小宽度 */
  minWidth?: number
  /** 头部可见 */
  headerVisible?: boolean
  /** 头部高度 */
  headerHeight?: number
  /** 标签可见 */
  tabVisible?: boolean
  /** 标签页高度 */
  tabHeight?: number
  /** 固定头部和标签 */
  fixedHeaderAndTab?: boolean
  /** 底部可见 */
  footerVisible?: boolean
  /** 底部高度 */
  footerHeight?: number
  /** 固定底部 */
  fixedFooter?: boolean
  /** 侧边可见 */
  siderVisible?: boolean
  /** 侧边栏高度 */
  siderWidth?: number
  /** 侧边栏折叠状态的高度 */
  siderCollapsedWidth?: number
  /** 侧边栏折叠状态 */
  siderCollapse?: boolean
  /** 动画过渡时间 */
  transitionDuration?: number
  /** 动画过渡速度曲线 */
  transitionTimingFunction?: string
}

export default RelaxedLayout
