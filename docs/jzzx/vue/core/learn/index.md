# Composition Api

## Vue2 Options Api 存在的弊端

```ts
<template>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
  {{counter}}
</tempalte>
<script>
export default {
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    increment() {

    },
    decrement() {

    }
  },
  computed: {
    doubleCounter() {
      return this.counter * 10 + 100
    }
  }
  created() {

  },
  mounted() {

  }
}
</script>
```

## 认识 composition api

### composition api 暴露出一个 setup 选项 是一个函数 可以替代 我们之前的 大部分 api

### 1. 函数的参数

```ts
<template>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
  {{counter}}
</tempalte>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'erkelost'
    }
  },
  setup(props, { attrs, slots, emit expose}) {
    console.log(props)
  }
}
```

### 2. 函数的返回值
