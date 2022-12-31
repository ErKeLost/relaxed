## 浏览器中的事件循环

如果在执行代码的时候，有异步操作

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bff8a4c6b2274860bd9c4d2cc7a94289~tplv-k3u1fbpfcp-watermark.image?)

插入一个 setTimeout 函数调用

```ts
function sum(num1, num2) {
  return num1 + num2
}

function bar() {
  return sum(20, 30)
}

setTimeout(() => {
  console.log('setTimeout')
}, 100)

bar()
```

## 宏任务和微任务

事件循环中维护着两个队列

宏任务队列: ajax, setTimeout, setInterval, DOM 监听， UI Rendering

微任务队列 promise 中 then 的回调， queueMicrotask()

执行 JavaScript 中代码的顺序

1. main script 中代码优先执行
2. 在执行任何一个宏任务之前，都会先查看微任务队列中是否有任务需要执行
3. 宏任务执行之前，必须保证微任务队列是空的
4. 如果微任务不是空的，那么就优先执行微任务中的回调

## Promise 测试题

```ts
console.log('start')
setTimeout(() => {
  new Promise((resolve) => {
    resolve()
  }).then(() => {
    new Promise((resolve) => {
      resolve()
    }).then(() => {
      console.log('then')
    })
    console.log('first')
  })
})

new Promise((resolve) => {
  resolve()
}).then(() => {
  console.log(666)
})

setTimeout(() => {
  console.log('setTimeout2')
})

queueMircotask(() => {
  console.log('queuemircotask')
})
new Promise((resolve) => {
  resolve()
}).then(() => {
  console.log('then3')
})
console.log('end')
```

:::tip 解答
:::

```ts
console.log('start')

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}

setTimeout(function () {
  console.log('setTimeout')
})

async1()

new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('end')
```

:::tip 解答
:::
