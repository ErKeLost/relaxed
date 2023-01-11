<template>
  <el-input placeholder="请输入改变title😃😃😃" v-model="title"></el-input>
</template>
<script setup lang="ts">
import { useTitle } from '@vueuse/core'
const title = useTitle()
console.log(title.value) // print current title
title.value = 'Hello' // change current title
</script>
