<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div>
    <slot name="a"></slot>
    <br />
    <slot name="b" :item="item.name"></slot>
    <slot name="c"> </slot>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
