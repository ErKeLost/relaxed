<template>
  <header class="adny-layout__header" :style="style">
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi'
import { useCssRender } from '@/hooks'
interface Props {
  /** 开启fixed布局 */
  fixed?: boolean
  /** fixed布局的层级 */
  zIndex?: number
  /** 最小宽度 */
  minWidth?: number
  /** 高度 */
  height?: number
  /** 左侧内边距 */
  paddingLeft?: number
  /** 动画过渡时间 */
  transitionDuration?: number
  /** 动画过渡时间 */
  transitionTimingFunction?: string
}
const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  zIndex: 1001,
  minWidth: 1200,
  height: 56,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
})
const { cssRender } = useCssRender()
const style = computed(() => {
  const {
    fixed,
    zIndex,
    minWidth,
    height,
    paddingLeft,
    transitionDuration,
    transitionTimingFunction
  } = props
  const position = fixed ? 'fixed' : 'static'
  const left = fixed ? paddingLeft : 0
  // return `height: ${height}px`
  // return `position: ${position};z-index: ${zIndex};min-width: ${minWidth}px;height: ${height}px;padding-left: ${paddingLeft}px;transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`;
  return `position: ${position};z-index: ${zIndex};min-width: ${minWidth}px;height: ${height}px;padding-left: ${left}px;transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`
})

// css
cssRender('.adny-layout__header', {
  left: 0,
  top: 0,
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '100%',
  transitionProperty: 'padding-left'
})
</script>
<style></style>
