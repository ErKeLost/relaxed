<script setup lang="ts">
import pLimit, { sleep } from '@relaxed/promise'

const limit = pLimit(2)

const input = [
  limit(() => sleep(1000, () => console.log('第一次并发'))),
  limit(() => sleep(5000, () => console.log('第二次并发'))),
  limit(() => sleep(1000, () => console.log('第三次并发')))
]
async function aa() {
  const res = await Promise.all(input)
  console.log(res)
}
aa()
</script>

<template>
  <RelaxedLayout>
    <template #header>
      <div class="flex-center h-full bg-#D0A245FF">Header</div>
    </template>
    <template #tab>
      <div class="flex-center h-full bg-#6DCB6C">Tab</div>
    </template>
    <template #sider>
      <div class="h-full bg-#6CCBC8">
        <div class="flex-center h-56px">Sider</div>
      </div>
    </template>
    <template #footer>
      <div class="flex-center h-full bg-#D061D8">Footer</div>
    </template>
    <div v-for="i in 50" :key="i" class="text-center">
      {{ i }}
    </div>
  </RelaxedLayout>
</template>
