![图片.png](https://vuex.vuejs.org/vuex.png)

## 什么是状态管理

- #### 在开发中，我们会的应用程序需要处理各种各样的数据，这些
  数据需要保存在我们应用程序中的某一个位置，对于这些数据
  的管理我们就称之为是 状态管理。

### vuex 之前的开发 是如何管理状态

- #### vue 开发中使用组件化的方式
- #### 在组件中我们定义 data 或者 在 setup 中返回使用的数据 我们成为 state
- #### 在 template 中我们可以使用这些数据， 模块最终会被渲染成 dom 我们称为 view
- #### 当我们在 组件中需要处理一些事件的行为 需要修改 state 然后重新渲染 dom 这些行为我们成为 action

![image](https://vuex.vuejs.org/flow.png)

### 复杂的状态管理

- #### 在 javascript 越来越复杂的情况下 我们需要管理的状态越来越多 或者多个组件共享视图 依赖同一状态，随着复杂的管理状态下 单纯通过组件 props 和 provide 的方式来共享状态

### Vuex 的状态管理

- #### 管理不断变化的 state 是非常困难的
- #### 组件之间状态相互依赖 一个状态会引起 其他状态的变化 当应用程序复杂时， state 在什么时候 因为什么发生变化 数据将会变得难追踪
- #### 因此我们需要将组件的内部状态抽离出来， 以一个全局单例的方式来管理

## 安装

- #### 我们要使用 vuex 所以我们要先安装 vuex

```js
pnpm install vuex
```

## 创建 store

- #### 每一个 vuex 应用的核心就是 store store 本质上就是一个容器
- #### vuex 和 全局对象有什么区别
- #### 第一， vuex 状态是响应式的 只要 store 中的 状态发生变化 那么相应的组件也被会更新
- #### 第二， 我们不能直接修改 store 中的 state 状态 修改 store 中的状态 唯一途径就是 commit 提交， 方便我们跟踪每一个状态的变化

## Vue devtool

- #### vue devtool 我们需要安装 最新 支持 vue3 版本 目前是 6.0.0beta21
- #### 如果可以科学上网， 我们直接在谷歌商店安装 简单 方便
- #### 因为我们不能科学上网 所以我们需要手动安装
- [vue-devtool 安装](https://github.com/vuejs/devtools/tree/v6.0.0-beta.21 'https://vuepress.vuejs.org/zh/theme/')
- #### 执行 pnpm install
- #### 执行 pnpm build
- #### 打包完成之后 直接 扔到谷歌扩展程序中

## Vue2 中的基本使用

```js
// src 目录新建store && mk index.js
import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
// 新建store
const store - new Vuex.store({
  state() {
    return {
      name: 'erkelost',
      girl: 'adny'
    }
  },
  getters: {
    fullName(state, getters) {
      return `${state.name}-${state.girl}`
    }
  },
  mutations: {
    setGirlName(state, newName) {
      state.girl = newName
    }
  },
  actions: {
    girlNameAction({ commit }) {
      setTimeout(() => {
        commit('setGirlName', 'foo')
      }, 1000)
    }
  },
  modules: {

  }

  export default store
})
```

## state 的基本使用

```js
// 我们可以直接在tempalte中使用
<p>{{ $store.state.name }}</p> // template 编译 具有代理模式 直接使用 $store 不需要使用this.
// 我们可以使用计算属性 返回 计算属性
computed: {
  name() {
    return this.$store.state.name
  }
}
```

## 使用 mapState 辅助函数

```js
import { mapState } from 'vuex'
computed: {
  ...mapState(['name', 'girl']) // 数组类型
  ...mapState({
    newName: state => state.name,
    newGirl: state => state.girl
  })
}

```

## getters 的基本使用

#### 某些属性我们可能需要经过变化之后来使用 这个时候我们可以使用 getters

```js
<p>{{ $store.getters.totalPrice }}</p>
state() {
  return {
    books: [
      name: 'vuejs', price: 200, count: 5,
      name: 'flutter', price: 50, count: 2,
      name: 'reactjs', price: 150, count: 3,
    ]
  }
},
getters: {
  totalPrice(state) {
    let totalPrice = 0
    for (const book of state.books) {
      totalPrice += book.count * book.price
    }
    return totalPrice
  }
}
```

### getters 可以接收第二个参数

```js
getters: {
  totalPrice(state, getters) {
    let totalPrice = 0
    for (const book of state.books) {
      totalPrice += book.count * book.price
    }
    return totalPrice * getters.discount // 我们可以调用其他的getters
  },
  discount(state) {
    return 0.5
  }
}
```

### getters 的返回函数

- #### getters 中的函数本身 可以返回一个函数 那么在使用的地方相当于可以调用这个函数

```js
getters: {
  totalPrice(state) {
    return price => {
      let totalPrice = 0
      for (const book of state.books) {
        if (book.price < price) continue
        totalPrice += book.price * book.count
      }

      return totalPrice
    }
  }
}
```

## mapGetters 的辅助函数

#### 我们依然可以使用 mapGetters 的辅助函数

```js
computed: {
  ...mapGetters(['totalPrice', 'discount']) // 数组形式
  ...mapGetters({
    finalPrice: 'totalPrice',
    finalDiscount: 'discount'
  })
}
```

## mutation 基本使用

#### 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation：

```js
state() {
  return {
    counter: 5
  }
},
mutations: {
  // 不携带参数的 mutations
  increment(state) {
    state.counter ++
  },
  decrement(state) {
    state.counter --
  },
  // 携带参数的 mutations
  addNumber(state, number) {
    state.counter += number
  },
  // payload 为对象类型
  addNumber(state, payload) {
    state.counter += payload.count
  }
}

// 在组件中 提交方式
methods: {
  click() {
    // 正常提交风格
    this.$store.commit('addNumber', 555)
    this.$store.commit('addNumber', { counte: 555 })
    // 对象风格提交方式
    this.$store.commit({
      type: 'addNumber',
      count: 555
    })
  }
}
```

### mutations 常量类型

#### 有时候 我们为了防止 mutations 命名写错 但是 代码不会报错 我们会选择 定义成常量

#### 首先我们新建 mutations-type.js

```js
// 定义常量
export const ADD_NUMBER = 'ADD_NUMBER'
// 定义mutation
[ADD_NUMBER](state, payload) {
  state.counter += payload.count
}
// 提交mutations
this.$store.commit({
  type: ADD_NUMBER,
  count: 100
})
```

## mapMutations 辅助函数

#### 我们也可以借助于辅助函数 帮助我们快速映射到相对应的方法中

```js
methods: {
  ...mapMutations({
    addNumber: ADD_NUMBER
  })
  ...mapMutations(['increment', 'decrement'])
}
```

:::warning mutations 重要原则

- 一条重要的原则就是要记住 mutation 必须是同步函数
- 这是因为 devtool 工具会记录 mutation 的日记
- 每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照
- 但是在 mutation 中执行异步操作，就无法追踪到数据的变化
- 所以 Vuex 的重要原则中要求 mutation 必须是同步函数
  :::

## actions 的基本使用

### action 类似于 mutation 不同在于

- action 提交的是 mutation 而不是直接变更状态
- action 可以包含任意异步操作

```js
mutations: {
  increment(state) {
    state.counter++
  }
},
actions: {
  incrementAction(context) {
    context.commit('increment')
  }
}
```

:::tip 重要参数 context
context 是一个和 store 实例均有相同方法和属性的 context 对象；所以我们可以从其中获取到 commit 方法来提交一个 mutation，或者通过 context.state 和 context.getters 来
获取 state 和 getters；
:::

### actions 的分发操作

#### 那么我们如果使用 action 呢 进行 action 的分发

```js
methods: {
  // 分发使用的是store上的dispatch
  add() {
    this.$store.dispatch('increment')
  }
  // 当然我们也可以携带参数
  add() {
    this.$store.dispatch('increment', { count: 100 })
  }
  // 也可以使用对象的形式进行分发
  add() {
    this.$store.dispatch({
      type: 'increment',
      count: 1000
    })
  }
}
```

## actions 的辅助函数

#### actions 也有对象和 数组的辅助函数

```js
import { mapActions } from 'vuex'
methods: {
  ...mapActions(['increment', 'decrement'])
  ...mapActions({
    add: 'increment',
    sub: 'decrement'
  })
}
```

## actions 的异步操作

#### Action 通常是异步的，那么如何知道 action 什么时候结束呢？

#### 我们可以通过让 action 返回 Promise，在 Promise 的 then 中来处理完成后的操作；

```js
actions: {
  increment({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit('increment')
        resolve('数据加载完成')
      }, 1000)
    })
  }
}
```

## module 的基本使用

#### 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可能变得相当臃肿；

#### 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）；

#### 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块；

```js
// 新建 module 文件夹
// new add mk dir mudulea
const moduleA = {
  state: () => {},
  mutations: {},
  actions: {},
  getters: {}
}
// new add mk dir muduleb
const moduleB = {
  state: () => {},
  mutations: {},
  actions: {},
  getters: {}
}
// 在index.js 中
const store = new Vuex.store({
  state() {
    return {}
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

### module 的局部状态

#### 对于模块内部的 mutations 的 getter 接收的第一个参数是模块的局部状态对象

```js
mutations: {
  changeName(state, data) {
    state.name = data
  }
},
getters: {
  info(state, getters, rootState) {
    return `${state.naame}-${rootState.counter}`
  }
},
actions: {
  changeNameAction({ state, commit, rootState }) {
    commit('changeName', 'erkelost')
  }
}
```

### module 的命名空间

:::danger
默认情况下，模块内部的 action 和 mutation 仍然是注册在全局的命名空间中的,
这样使得多个模块能够对同一个 action 或 mutation 作出响应；
Getter 同样也默认注册在全局命名空间
如果我们希望模块具有更高的封装度和复用性，可以添加 namespaced: true 的方式使其成为带命名空间的模块
当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名；
:::

```js
// MouduleA.js ->
export default {
  namespaced: true,
  state() {
    return {}
  }
}
```

#### 如何访问

```js
// user模块
export default {
  namespaced: true,
  // $store.state.user.name
  state() {
    return {
      name: 'erkelost'
    }
  },
  // 访问 $store.commit('user/changeName')
  mutations: {
    changeName(state) {
      state.name = 'adny'
    }
  },
  // $store.getters['user/info']
  getters: {
    info(state, getters, rootState, rootGetters) {
      return `${state.name}-${rootState.name}`
    }
  },
  actions: {
    changeNameAction({ commit, dispatch, state, rootState, getters, rootGetters }) {
      // 当前 模块
      commit('changeName', 'adny')
      // 根 root
      commit('changeRootName', null, { root: true })
      dispatch('chaangeRootName', null, { root: true })
    }
  }
}
```

### module 修改或派发根组件

#### 如果我们希望在 模块中 修改 root 中的 状态 那么有如下的方式

```js
actions: {
  changeNameAction({ commit, dispatch, state, rootState, getters, rootGetters }) {
    // 当前 模块
    commit('changeName', "adny")
    // 根 root
    commit('changeRootName', null, { root: true })
    dispatch('chaangeRootName', null, { root: true })
  }
}
```

## module 的辅助函数

### module 的辅助函数一共有三种使用方法

```js
import { mapActions, mapState, mapMutations, mapGetters, createNameSpacedHelpers } from 'vuex'
// 第三种写法 这种写法 就在当前模块中我们使用的 就是当前模块的 根root 方法
const { mapState, mapMutations, mapActions, mapGetters } = createNameSpacedHelpers('home')
export default {
  computed: {
    // 第一种  对象写法
    ...mapState({
      counter: state => state.user.counter
    })
    ...mapGetters({
      dobuleHomeCounter: "user/doubleHomeCounter"
    })
    // 写法二 数组
    ...mapState('user', ['counter'])
    ...mapGetters('user', ['doubleHomeCounter'])
  },
  methods: {
    // 写法一
    ...mapMutations({
      increment: 'home/increment'
    })
    ...mapActions({
      incrementActions: 'home/incrementActions'
    })
    // 写法二
    ...mapMutations('home', ['increment'])
    ...mapActions('home', ['incrementActions'])
  }
}
```
