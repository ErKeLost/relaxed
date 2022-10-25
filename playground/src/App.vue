<!-- eslint-disable no-console -->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue'
import { formatDateDistance, arrayToTree } from '@relaxed/utils'
import { useStrategy } from '@relaxed/design-pattern'
import HelloWorld from './components/HelloWorld.vue'
import ScopeSlot from './components/ScopeSlot.vue'
function clickSlot() {
  console.log('clickSlot')
  const res = formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN' })
  console.log(res)
}
const loginSuccess = ref(true)
const initialPassword = ref(false)
// // useStrategy(loginSuccess, initialPassword)
// const handlerLoginLogic = (loginSuccess: boolean, initialPassword?: boolean | null) => {
//   let action = [...loginLogic()].filter(
//     ([key, value]) => key.loginSuccess === loginSuccess && key.initialPassword === initialPassword
//   )
//   console.log(action)
//   console.log(this)

//   action.forEach(([key, value]) => {
//     value.call(this)
//   })
// }
// handlerLoginLogic(true, true)
function loginLogic() {
  const loginMap = new Map([
    [
      {
        loginSuccess: true,
        ww: true
      },
      () => {
        console.log('现在是登录成功 并且密码是初始化')
      }
    ],
    [
      {
        loginSuccess: true,
        ww: false
      },
      async () => {
        console.log('现在是登录成功 进入公司首页')
      }
    ],
    [
      {
        loginSuccess: false,
        ww: false
      },
      () => {
        console.log('现在登录失败 出现error')
      }
    ]
  ])
  return loginMap
}
// [...args].map((item) => key.item === item)

function useStrategya(aaa: any, ...args: any) {
  const action = [...aaa()]
  let index = 0
  const res = action.map((item) => item[0])
  const b = res.map((item) => Object.values(item))
  const c = b.filter((item, index) => scalarArrayEquals(item, [...args]))
  console.log(b)
  console.log(c)
  const [arr] = c
  let ind
  b.forEach((item, oo) => {
    const res = item.every((i, index) => {
      return item[index] === arr[index]
    })
    if (res) {
      ind = oo
    }
  })
  console.log(ind)
  const d = action[ind]
  ;[d].forEach(([key, value]) => {
    value.call(this)
  })
}
function scalarArrayEquals(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every(function (v, i) {
      return v === array2[i]
    })
  )
}
useStrategya(loginLogic, true, true)
/** 数组结构数据 */
// const flatArr = [
//   { id: '01', parentId: 0, name: '节点1' },
//   { id: '011', parentId: '01', name: '节点1-1' },
//   { id: '0111', parentId: '011', name: '节点1-1-1' },
//   { id: '02', parentId: 0, name: '节点2' },
//   { id: '022', parentId: '02', name: '节点2-2' },
//   { id: '023', parentId: '02', name: '节点2-3' },
//   { id: '0222', parentId: '022', name: '节点2-2-2' },
//   { id: '03', parentId: 0, name: '节点3' }
// ]

// const result = arrayToTree(flatArr, 0)
// console.log('result', result)
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
