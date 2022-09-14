<template>
  <LayoutContainer :style="{ minWidth: minWidth + 'px' }">
    <LayoutContainer direction="vertical">
      <layout-sider
        v-if="siderVisible"
        v-bind="commonProps"
        :z-index="siderZIndex"
        :width="siderWidth"
        :padding-top="siderPaddingTop"
        :top="siderTop"
        :fixed="fixedSider"
        :holdHeaderFixedSider="holdHeaderFixedSider"
      >
        <slot name="sider"></slot>
      </layout-sider>
      <LayoutContainer :style="{ height: '100vh', backgroundColor: contentBg }">
        <layout-header
          v-if="headerVisible"
          v-bind="commonProps"
          :fixed="fixedHeaderAndTab"
          :z-index="headerZIndex"
          :min-width="minWidth"
          :height="headerHeight"
          :padding-left="headerPaddingLeft"
          :style="headerAndTabTransform"
        >
          <slot name="header"></slot>
        </layout-header>
        <layout-tab
          v-if="tabVisible"
          :headerVisible="headerVisible"
          v-bind="commonProps"
          :fixed="fixedHeaderAndTab"
          :z-index="tabZIndex"
          :min-width="minWidth"
          :top="headerHeight"
          :height="tabHeight"
          :padding-left="tabPaddingLeft"
          :style="headerAndTabTransform"
        >
          <slot name="tab"></slot>
        </layout-tab>
        <layout-content
          :style="{ maxWidth: maxWidth }"
          v-bind="allProps"
          :padding-top="contentPaddingTop"
          :padding-bottom="contentPaddingBottom"
          :padding-left="siderWidth"
          :fixedSider="fixedSider"
          :siderVisible="siderVisible"
          :holdHeaderFixedSider="holdHeaderFixedSider"
          :footerHeight="footerHeight"
          :fixedFooter="fixedFooter"
          :showFooter="footerVisible"
          :height="otherHeight"
          :maxWidth="maxWidthDiv"
        >
          <slot></slot>
        </layout-content>
        <layout-footer
          v-if="footerVisible"
          v-bind="commonProps"
          :fixed="fixedFooter"
          :z-index="footerZIndex"
          :min-width="minWidth"
          :height="footerHeight"
          :padding-left="siderWidth"
          :style="footerTransform"
          :fixedSider="fixedSider"
          :siderVisible="siderVisible"
          :showFooter="footerVisible"
        >
          <slot name="footer"></slot>
        </layout-footer>
      </LayoutContainer>
    </LayoutContainer>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi'
import LayoutTab from './src/LayoutTab.vue'
import LayoutContent from './src/LayoutContent.vue'
import LayoutSider from './src/LayoutSider.vue'
import LayoutHeader from './src/LayoutHeader.vue'
import LayoutFooter from './src/LayoutFooter.vue'
import LayoutContainer from './src/LayoutContainer.vue'
import { useCssRender, useFixedTransformStyle } from '../../hooks'

interface Props {
  maxWidth?: number
  contentBg?: string
  // 第三种布局 tab 不跟 header 一起变 的 顶部菜单布局
  tabMoveable?: boolean
  holdHeaderFixedSider?: boolean
  fixedSider?: boolean
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
const props = withDefaults(defineProps<Props>(), {
  contentBg: '#f5f6f9',
  maxWidth: 1920,
  tabMoveable: true,
  mode: 'vertical',
  holdHeaderFixedSider: false,
  fixedSider: false,
  minWidth: 1200,
  headerVisible: true,
  headerHeight: 156,
  tabVisible: true,
  tabHeight: 44,
  fixedHeaderAndTab: true,
  footerVisible: true,
  footerHeight: 68,
  fixedFooter: false,
  siderVisible: true,
  siderWidth: 300,
  siderCollapsedWidth: 64,
  siderCollapse: false,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
})

const { cssRender } = useCssRender()
// fixed布局时，应用translateX样式(水平方向出现滚动条，拖动滚动条时，fixed元素跟着滚动)
const hasFixedEl = computed(() => props.fixedHeaderAndTab || props.fixedFooter)
const transformStyle = useFixedTransformStyle(hasFixedEl)
const headerAndTabTransform = computed(() => (props.fixedHeaderAndTab ? transformStyle.value : ''))
const footerTransform = computed(() => (props.fixedFooter ? transformStyle.value : ''))
/** 各个子组件的公共属性 */
const commonProps = computed(() => {
  const { transitionDuration, transitionTimingFunction } = props
  return {
    transitionDuration,
    transitionTimingFunction
  }
})
const otherHeight = computed(() => {
  const footer = props.fixedFooter ? props.footerHeight : 0
  const tab = props.tabVisible ? props.tabHeight : 0
  const header = props.headerVisible ? props.headerHeight : 0
  return tab + header + footer
})
const allProps = computed(() => {
  return props
})
/** 水平布局 */
const isVertical = computed(() => props.mode === 'vertical')
// fixed布局时的层级
const headerZIndex = 1001
const tabZIndex = 999
const siderZIndex = computed(() => (isVertical.value ? 1002 : 1000))
const footerZIndex = 999
const maxWidthDiv = computed(() => props.maxWidth)
/** 侧边宽度 */
const siderWidth = computed(() => {
  const { siderCollapse, siderWidth, siderCollapsedWidth } = props
  const width = siderCollapse ? siderCollapsedWidth : siderWidth
  return props.siderVisible ? width : 0
})
// 各子组件的属性
const headerPaddingLeft = computed(() => (isVertical.value ? siderWidth.value : 0))
const tabPaddingLeft = computed(() => {
  return !isVertical.value ? (props.tabMoveable ? siderWidth.value : 0) : siderWidth.value
})
const siderPaddingTop = computed(() =>
  !isVertical.value && props.headerVisible
    ? props.headerHeight + (!props.tabMoveable ? props.tabHeight : 0)
    : 0
)
const siderTop = computed(() => {
  return props.headerVisible ? props.headerHeight + props.tabHeight : 0
})
const contentPaddingTop = computed(() => {
  let height = 0
  if (props.fixedHeaderAndTab) {
    if (props.headerVisible) {
      height += props.headerHeight
    }
    if (props.tabVisible) {
      height += props.tabHeight
    }
  }
  return height
})
const contentPaddingBottom = computed(() =>
  props.fixedFooter && props.footerVisible ? props.footerHeight : 0
)
// css
cssRender('.soybean-admin-layout', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
})
</script>
<style></style>
