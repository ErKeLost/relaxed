<template>
  <section class="adny-layout__container" :style="style">
    <slot />
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue-demi'
import { useCssRender } from '@/hooks'
interface Props {
  direction?: 'horizontal' | 'vertical'
}
const props = defineProps<Props>()
const { cssRender } = useCssRender()
const style = computed(() => {
  const { direction } = props
  const directionStyle =
    direction === 'vertical' ? 'flex-direction: row;' : 'flex-direction: column;'
  return directionStyle
})
cssRender('.adny-layout__container', {
  display: 'flex',
  flex: 1,
  flexBasis: 'auto',
  boxSizing: 'border-box',
  minWidth: 0,
  transitionProperty: 'all'
})
</script>
