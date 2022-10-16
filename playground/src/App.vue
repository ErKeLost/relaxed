<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ScopeSlot from './components/ScopeSlot.vue'
const music = ref<string[]>()
const a = ['123', '456']
function click() {}
function clickReactive() {
  music.value = a
}
console.log(666)
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
  {{ music }}
  <n-button @click="clickReactive">clickReactive</n-button>
  <ScopeSlot
    :item="{
      name: 'erkelost'
    }"
  >
    <template #a>
      <n-button @click="click">clickOutSide</n-button>
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
