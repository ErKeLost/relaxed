<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { formatDateDistance } from '@relaxed/utils'
import HelloWorld from './components/HelloWorld.vue'
import ScopeSlot from './components/ScopeSlot.vue'
function clickSlot() {
  console.log('clickSlot')
  const res = formatDateDistance({ lang: 'zh-CN' }, 1658320372161, 1658717927699)
  console.log(res)
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <ScopeSlot
    :item="{
      name: 'erkelost'
    }"
  >
    <template #a>
      <n-button @click="clickSlot">clickOutSide</n-button>
    </template>
    <template #b="{ item }">
      <n-button>{{ item }}</n-button>
    </template>
  </ScopeSlot>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
