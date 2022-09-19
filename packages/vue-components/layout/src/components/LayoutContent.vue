<template>
  <main :style="style" class="adny-layout__main">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi'
import { useCssRender } from '@/hooks'
interface Props {
  holdHeaderFixedSider?: boolean
  siderVisible?: boolean
  fixedSider?: boolean
  /** 顶部内边距 */
  paddingTop?: number
  /** 底部内边距 */
  paddingBottom?: number
  /** 左侧内边距 */
  paddingLeft?: number
  /** 动画过渡时间 */
  transitionDuration?: number
  /** 动画过渡时间 */
  transitionTimingFunction?: string
  /** 底部固定 导致margin高度 */
  fixedFooter?: boolean
  footerHeight?: number
  showFooter?: boolean
  height?: number
  maxWidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
  fixedFooter: false,
  footerHeight: 0
})
const { cssRender } = useCssRender()
const style = computed(() => {
  const {
    holdHeaderFixedSider,
    paddingTop,
    siderVisible,
    paddingBottom,
    paddingLeft,
    fixedSider,
    transitionDuration,
    transitionTimingFunction,
    fixedFooter,
    footerHeight,
    showFooter,
    height,
    maxWidth
  } = props
  const marginLeft =
    (siderVisible && fixedSider) || (holdHeaderFixedSider && fixedSider) ? paddingLeft : 0
  const marginBottom = fixedFooter && showFooter ? footerHeight : 0
  // return `padding-top: ${paddingTop}px;padding-bottom: ${paddingBottom}px;padding-left: ${paddingLeft}px;transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`;
  // return `height: calc(100vh - ${height}px);paddingBottom: ${marginBottom}px;margin-top: ${paddingTop}px; padding-left: ${marginLeft}px;transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`
  return `max-width:${maxWidth}px;paddingBottom: ${marginBottom}px;margin-top: ${paddingTop}px; padding-left: ${marginLeft}px;transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`
})

// css
cssRender('.adny-layout__main', {
  flexGrow: 1,
  boxSizing: 'border-box',
  width: '100%',
  marginRight: 'auto',
  marginLeft: 'auto'
  // overflowY: 'scroll'
  // transitionProperty: 'padding-left'
})
</script>
