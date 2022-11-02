<script setup lang="ts">
import './ScopeSlot.vue'

import { ref } from 'vue'
import { subscribe } from '../eventbus'

defineProps<{ msg: string }>()

const count = ref(0)
subscribe.on('sell', (args: any) => {
  doShowOuter()
})
const showOuter = ref(false)
const showInner = ref(false)
function doShowOuter() {
  showOuter.value = true
}
function doShowInner() {
  showInner.value = true
}
</script>

<template>
  <n-button @click="doShowOuter"> HelloWorld组件 </n-button>
  <n-drawer v-model:show="showOuter" :width="502">
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      <template #footer>
        <n-button @click="doShowInner"> 再来一个！ </n-button>
      </template>
    </n-drawer-content>
    <n-drawer v-model:show="showInner" :width="251">
      <n-drawer-content title="斯通纳">
        《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      </n-drawer-content>
    </n-drawer>
  </n-drawer>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code>
      to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
    official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
