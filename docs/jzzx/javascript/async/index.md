![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80655ad9d5c2440fadf4b30ff5fec2fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## 异步函数

async 关键字用于声明一个异步函数

async 是 asynchronous 单词的缩写 异步 非同步

sync 是 synchronous 单词的缩写 同步 同时

async 异步函数的写法

```ts
async function foo() {}

const foo = async function () {}

const foo = async () => {}

class Person {
  async foo() {}
}
```

## 异步函数的执行流程

异步函数的内部代码执行过程和普通函数是一致的，默认情况下会被同步执行

异步函数有返回值的时候会和普通函数有区别

1. 异步函数返回值 相当于被包裹到 Promise.resolve 中
2. 如果异步函数的返回值是一个 promise 状态会有 Promise 决定
3. 如果异步函数返回值是一个对象并且实现了 thenable， 那么会由 then 的方法来决定

如果在 async 异步函数中抛出了异常，那么程序并不会像普通函数一样报错， 而是会作为 Promise 的 reject 来传递

async 函数另外一个点就是可以在内部使用 await 关键字

await 关键字特点

1. 通常后面跟上一个表达式，这个表达式会返回一个 promise
2. await 会等到 promise 状态变成 fulfilled 状态之后 继续执行异步函数

:::warning
如果 await 后面是一个普通的值，那么会直接返回这个值
如果 await 后面是一个 thenable 对象 那么会根据对象的 then 方法来决定后续的值
如果 await 后面的表达式 返回的是 promise 的 reject 状态 那么这个 reject 结果直接作为 函数 promise 的 reject 值
:::
