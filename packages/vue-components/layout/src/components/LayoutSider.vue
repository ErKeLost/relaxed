<template>
  <aside :class="fixed ? 'adny-layout__fixedSider' : 'adny-layout__sider'" :style="style">
    <slot />
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue-demi'
import { useCssRender } from '@/hooks'
interface Props {
  top?: number
  holdHeaderFixedSider?: boolean
  fixed?: boolean
  /** fixed布局的层级 */
  zIndex?: number
  /** 宽度 */
  width?: number
  /** 顶部内边距 */
  paddingTop?: number
  /** 动画过渡时间 */
  transitionDuration?: number
  /** 动画过渡时间 */
  transitionTimingFunction?: string
}
const props = withDefaults(defineProps<Props>(), {
  zIndex: 1002,
  width: 200,
  paddingTop: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
})
const { cssRender } = useCssRender()
const style = computed(() => {
  const {
    holdHeaderFixedSider,
    zIndex,
    top,
    width,
    paddingTop,
    fixed,
    transitionDuration,
    transitionTimingFunction
  } = props
  const position = holdHeaderFixedSider ? 'fixed' : null
  const topDis = holdHeaderFixedSider ? top : null
  const height = fixed ? '100vh' : null
  const overflow = fixed ? 'auto' : 'hidden'
  return `height: ${height};position:${position};top: ${topDis}px; z-index: ${zIndex};min-width:${width}px;width: ${width}px;padding-top: ${paddingTop}px; overflow-y :${overflow};transition-duration: ${transitionDuration}ms;transition-timing-function: ${transitionTimingFunction};`
})

cssRender('.adny-layout__sider', {
  boxSizing: 'border-box',
  transitionProperty: 'all'
})
cssRender('.adny-layout__fixedSider', {
  position: 'fixed',
  left: 0,
  top: 0,
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  transitionProperty: 'all'
})
</script>
<style></style>
