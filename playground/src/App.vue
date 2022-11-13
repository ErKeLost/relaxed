<!-- eslint-disable no-console -->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue'
import { formatDateDistance, arrayToTree } from '@relaxed/utils'
import { useStrategy } from '@relaxed/design-pattern'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import ScopeSlot from './components/ScopeSlot.vue'
import { sub } from 'date-fns'
import { subscribe } from './eventbus'
function clickSlot() {
  const res = formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN' })
  subscribe.emit('sell', [123, 4564, 'aoteman'])
}
function loginLogic() {
  const loginMap = new Map([
    [
      {
        loginSuccess: true,
        passwordVerify: true
      },
      () => {
        console.log('现在是登录成功 并且密码是初始化')
      }
    ],
    [
      {
        loginSuccess: true,
        passwordVerify: false
      },
      async () => {
        // console.log('现在是登录成功 进入公司首页')
      }
    ],
    [
      {
        loginSuccess: false,
        passwordVerify: false
      },
      () => {
        console.log('现在登录失败 出现error')
      }
    ]
  ])
  return loginMap
}
useStrategy(loginLogic, true, false)
subscribe.on('by', () => {
  console.log('app组件中订阅')
})
</script>

<template>
  <Test />
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
      <n-button @click="clickSlot">App组件</n-button>
    </template>
    <template #b="{ item }">
      <!-- <n-button>{{ item }}</n-button> -->
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
