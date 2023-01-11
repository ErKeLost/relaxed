![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80655ad9d5c2440fadf4b30ff5fec2fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

# Promise

## 异步代码的困境

普通异步任务的处理

```ts
function requestData(url, successCallback, failureCallback) {
  setTimeout(() => {
    if (typeof 'test' === 'string') {
      successCallback('成功')
    } else {
      failureCallback('失败')
    }
  })
}
```

上面解决方案中 我们可以在请求函数得到结果之后 获取到对应的回调，但是存在两个问题

:::warning
第一，我们需要自己来设计回调函数、回调函数的名称、回调函数的使用等；

第二，对于不同的人、不同的框架设计出来的方案是不同的，那么我们必须耐心去看别人的源码或者文档，以便可以理解它
这个函数到底怎么用；
:::

## Promise

 Promise 是一个类，可以翻译成 承诺、许诺 、期约；
 当我们需要的时候，给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个 Promise 的对象；
 在通过 new 创建 Promise 对象时，我们需要传入一个回调函数，我们称之为 executor
✓ 这个回调函数会被立即执行，并且给传入另外两个回调函数 resolve、reject；
✓ 当我们调用 resolve 回调函数时，会执行 Promise 对象的 then 方法传入的回调函数；
✓ 当我们调用 reject 回调函数时，会执行 Promise 对象的 catch 方法传入的回调函数

代码结构

```ts
const promise = new Promise((resolve, reject) => {
  resolve(666)
  reject(999)
})
```

调用 resolve 那么 then 传入的回调函数会被执行

调用 reject 那么 catch 传入的回调函数会被执行

:::warning 划分三种状态
待定（pending）: 初始状态，既没有被兑现，也没有被拒绝；

✓ 当执行 executor 中的代码时，处于该状态；

已兑现（fulfilled）: 意味着操作成功完成；

✓ 执行了 resolve 时，处于该状态，Promise 已经被兑现；

已拒绝（rejected）: 意味着操作失败；

✓ 执行了 reject 时，处于该状态，Promise 已经被拒绝；
:::

promise 重构当前代码

```ts
function getData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === '111') {
        resolve('success')
      } else {
        reject('error')
      }
    }, 2000)
  })
}
```

## Executor

Executor 是在创建 promise 的时候需要传递的一个回调函数，这个函数会被立即执行并且传入两个参数，
::: warning promise 状态
通常我们会在 Executor 中来确定我们 promise 的状态

通过 resolve 可以兑现 fulfilled promise 状态

通过 reject 可以拒绝 reject promise 的状态
:::

状态一旦被确定 promise 的状态会被锁死 该 promise 的状态是不可以更改的

## Resolve 不同值的区别

- 如果传入 resolve 的是一个 普通的值或者对象， 那么这个值会作为 then 的回调参数
- 如果 resolve 中传入的是另一个 promise ，那么新的 promise 会决定原来 promise 的状态
- 如果 resolve 传入的是一个对象 并且这个对象有实现这个 then 方法 thenable 就会执行 then 方法，根据 then 方法的结构来决定 promise 的状态

## then 方法

then 是 promise 对象上的一个实例方法 ，在 Promise 的原型上 Promise.prototype.then

then 方法接受两个参数 fulfilled 的回调参数 和 reject 的回调参数

```ts
const promise = new Promise((resolve, reject) => {
  resolve()
  reject()
})
promise.then(
  (res) => {
    console.log('fulfilled')
  },
  (err) => {
    console.log('reject')
  }
)
```

等价于

```ts
promise
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

then 方法具有返回值 是一个 promise 所以可以进行链式调用

:::warning 但是 then 方法 返回的 promise 处于一个什么状态
Promise 有三种状态，那么这个 Promise 处于什么状态呢？

当 then 方法中的回调函数本身在执行的时候，那么它处于 pending 状态；

当 then 方法中的回调函数返回一个结果时，那么它处于 fulfilled 状态，并且会将结果作为 resolve 的参数；

✓ 情况一：返回一个普通的值；

✓ 情况二：返回一个 Promise；

✓ 情况三：返回一个 thenable 值；

当 then 方法抛出一个异常时，那么它处于 reject 状态；
:::

## Catch 方法

catch 方法也是 Promise 对象上的实例方法 (Promise.prototype.catch)

当 Promise 的状态变成 reject 的时候这些回调函数都会被执行

事实上 catch 方法也是会返回一个 Promise 对象的，所以 catch 方法后面我们可以继续调用 then 方法或者 catch 方法：

catch 传入的回调在执行完后，默认状态依然会是 fulfilled 的；

所以如果 有 then 他还是会继续执行 then 里面的回调

## Finally 方法

表示无论 promise 对象变成 fulfilled 还是 rejected 状态 最后都会被执行
finally 方法不接收参数，不论结果状态如何 他都会执行

```ts
const promise = new Promise((resolve, reject) => {
  reject('reject')
})

promise
  .then((res) => {
    console.log('res', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
  .finally(() => {
    console.log('我是finally')
  })
```

## Resolve 方法

Promise 类方法

有时候我们已经有一个现成的内容了，希望将其转成 Promise 来使用，这个时候我们可以使用 Promise.resolve 方法来完成。
Promise.resolve 的用法相当于 new Promise，并且执行 resolve 操作：

```ts
Promise.resolve('hello world')
// 相当于
new Promise((resolve) => {
  resolve('hello world')
})
```

如果有一种我们可以直接获取到的结果 我们可以使用 Promise.resolve()

## Reject 方法

reject 方法 类似于 resolve 方法，只会将 promise 对象的状态设置成 reject 状态

Promise.reject 的用法相当于 new Promise 只会调用 reject

## All 方法

```ts
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})

Promise.all([p1, p2, p3]).then((res) => {
  console.log('res', res)
})
```

将多个 promise 包裹在一起形成一个新的 promise

新的 promise 状态由包裹的所有 promise 共同决定，

当所有 promise 状态变成 fulfilled 新的 promise 状态就是 fulfilled 将所有 promise 的返回值组成一个新的数组

当有一个 promise 的状态 为 reject 的时候 新的状态就会变成 reject 并会将第一个 reject 的返回值作为参数

## AllSettled 方法

all 方法的缺陷， 当有其中一个 promise

当其中一个 promise 变成 reject 状态的时候 新的 promise 立即就会变成对应的 reject 状态

allSettled 会在所有 Promise 都有结果的时候 不论你是 fulfilled 还是 rejected 这个 promise 的最终状态一定是 fulfilled

```ts
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})

Promise.allSettled([p1, p2, p3]).then((res) => {
  console.log('res', res)
})
```

## Race 方法

竞争结果 谁先有结果就用谁的结果

```ts
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})
Promise.race([p1, p2, p3]).then((res) => {
  // p1先拿到结果
})
```

## any 方法

race 不论你最新拿到的 promise 的结果 是 fulfilled 还是 rejected 都会给你返回

any 是会返回一个最快的 fulfilled 状态

```ts
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p1')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})
Promise.any([p1, p2, p3]).then((res) => {
  // p2先拿到结果
})
```

如果所有都是 promise 都是 reject 那么就会 返回一个 错误

## 迭代器和生成器

迭代器

迭代器（iterator），使用户在容器对象（container，例如链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节。

其行为像数据库中的光标，迭代器最早出现在 1974 年设计的 CLU 编程语言中；
在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如 Java、Python 等；

从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。

在 JavaScript 中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）：

迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式；

在 JavaScript 中这个标准就是一个特定的 next 方法；

next 方法有如下的要求：
一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：

done（boolean）
✓ 如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定 done 这个属性。）

✓ 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
value

✓ 迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

```ts
const names = ['abc', 'cba', 'bca']

// 为了去循环 这个names 数组
// 我们需要给names 创建一个迭代器

const namesIterator = {
  next() {
    // 必须有两个参数
    // done boolean
    // value 具体的值 / undefined
    return {
      done: true,
      value: 'abc'
    }
  }
}
```

实现一个简易迭代器 names 的迭代器

```ts
const names = ['abc', 'cba', 'bca']

let index = 0
const nameIterator = {
  next: function () {
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true }
    }
  }
}
console.log(nameIterator.next())
console.log(nameIterator.next())
console.log(nameIterator.next())
console.log(nameIterator.next())
```

## 可迭代对象

那么迭代器到底有什么用呢

但是上面的代码整体来说看起来是有点奇怪的：
我们获取一个数组的时候，需要自己创建一个 index 变量，再创建一个所谓的迭代器对象；

事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象；
什么又是可迭代对象呢？

它和迭代器是不同的概念；
当一个对象实现了 iterable protocol 协议时，它就是一个可迭代对象；
这个对象的要求是必须实现 @@iterator 方法，在代码中我们使用 Symbol.iterator 访问该属性；

当然我们要问一个问题，我们转成这样的一个东西有什么好处呢？

当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作；
比如 for...of 操作时，其实就会调用它的 @@iterator 方法；

:::warning 可迭代对象
JavaScript 对可迭代对象专门定义了一个方法

必须实现一个特定函数 [Symbol.iterator]
这个函数必须返回一个迭代器

```ts
const infos = {
  friends: ['kobe', 'james', 'curry'],
  [Symbol.iterator]() {
    let index = 0
    const iterator = {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] }
        } else {
          return { done: true }
        }
      }
    }
    return iterator
  }
}
```

:::

:::warning 可迭代对象必然具备以下特点

1. 可以使用 for of
2. 当一个对象实现了 iterable protocol 协议的时候 他就是一个可迭代对象
3. 这个对象要求必须实现 @@ iterator 方法 在代码中 我们可以使用 Symbol.iterator 访问该属性
   :::

## 原生可迭代对象

使用 for of 来确定当前对象是一个可迭代对象
:::warning 原生可迭代对象
string, array, map, set, arguments 都是可迭代对象

或者通过可迭代对象中含有一个 [Symbol.iterator]()函数来返回一个迭代器
:::

## 可迭代对象的应用场景

JavaScript 中语法：for ...of、展开语法（spread syntax）、yield\*（后面讲）、解构赋值（Destructuring_assignment）；

创建一些对象时：new Map([Iterable])、new WeakMap([iterable])、new Set([iterable])、new WeakSet([iterable]);

一些方法的调用：Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable);

:::warning 对象解构
对象的结构 不是可迭代对象的语法 是 JavaScript 特殊处理
:::

## 自定义类的可迭代

使用自己定义的 class 创建出来的对象如何可以是可迭代对象

```ts
class Person {
  constructor(public name: string, public age: number) {}

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < Object.entires(this).length) {
          return { done: false, value: Object.entires(this)[index++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

const p1 = new Person('erkelost', 9999999)
const p2 = new Person('adny', 9999999)
```

## 迭代器的中断

```ts
class Person {
  constructor(public name: string, public age: number) {}

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < Object.entires(this).length) {
          return { done: false, value: Object.entires(this)[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
      // 监听迭代器终端
      return: () => {
        console.log('监听迭代器中断了')
        return { done: true }
      }
    }
  }
}

const p1 = new Person('erkelost', 9999999)
for (const item of p1) {
  if (item === 'erkelost') {
    break
  }
}
```

## 生成器

生成器是 es6 新增的一种函数控制，使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行什么时候暂停执行，

生成器是一个函数，和普通函数有一些区别

:::warning 生成器和普通函数的区别
首先 生成器需要函数 function 后面加一个符号\*

其次 生成器函数可以通过 yield 关键字来控制函数的执行流程

最后 生成器的函数返回值是一个 Generator

生成器是一种特殊的迭代器
:::

```ts
function* foo() {
  // 生成器的函数执行通过 yield 控制
  // 正常情况这种执行是不会执行代码的
  console.log(111)
  console.log(222)
  console.log(333)
  // 这样可以
  console.log(111)
  yield
  console.log(222)
  yield
  console.log(333)
}

// 返回值 是一个生成器对象
const generator = foo()
// 如果想要执行函数内部的代码 需要生成一个生成器对象 然后执行 next 操作
// 当遇到 yield 的时候 就会中断执行
```

## 生成器参数与返回值

生成器函数可以暂停分段执行，那么函数是可以传递参数的，那么如何给每个分段 yield 传递参数

可以在调用 next 函数的时候传递参数，这个参数会作为上一个 yield 的返回值

```ts
function* foo(initial) {
  const value1 = yield initial + 'aaa'
  const value2 = yield value1 + 'bbb'
  const value3 = yield value2 + 'ccc'
}
const generator = foo('adny')
const result1 = generator.next()
const result2 = generator.next(result1.value)
const result3 = generator.next(result2.value)
```

## 生成器函数提前结束

```ts
function* foo(initial) {
  const value1 = yield initial + 'aaa'
  const value2 = yield value1 + 'bbb'
  const value3 = yield value2 + 'ccc'
}

const generator = foo('adny')
const result1 = generator.next()
const result2 = generator.return(result1.value)
const result3 = generator.next(result2.value)
```

跟迭代器一样 有一个 return 函数可以提前中断

:::warning 中断
generator.return()
generator.throw(new Error('error'))
:::

## 生成器代替迭代器

生成器是一种特殊的迭代器， 那么在某些情况下我们可以使用生成器来替代迭代器

:::warning 如何用生成器简化迭代器

```ts
function createArrayIterator(arr) {
  let index = 0
  const iterator = {
    next() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true, value: undefined }
      }
    }
  }
  return iterator
}
// 如果编写一个传统的迭代器 需要写这么多代码
// 如果搭配生成器
function* createArrayIterator(arr) {
  for (const item of arr) {
    yield item
  }
}

function* createRangeIterator(start, end) {
  for (let i = start; i < end; i++) {
    yield i
  }
}

// 在搭配 yield 的语法糖 只能迭代可迭代对象
// 一行就搞定了
function* createArrayIterator(arr) {
  yield* arr
}
```

:::

## 自定义类的迭代器实现

```ts
class Person {
  constructor(public name: string, public age: number) {}

  *[Symbol.iterator]() {
    yield* Object.entires(this)
  }
}
```

## 异步处理与传统解决方案

传统异步发送三次请求，后两次的请求依赖前两次的请求结果

```ts
function requestData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url)
    }, 2000)
  })
}

function getData() {
  requestData('adny').then((res) => {
    requestData(res).then((res2) => {
      requestData(res2).then((res) => {
        console.log('最后一次请求的结果')
      })
    })
  })
}

还有一种解决方法就是我们返回自定义promise

function getData() {
  requestData('adny')
    .then((res) => {
      return requestData(res)
    })
    .then((res2) => {
      return requestData(res2)
    })
    .then((res3) => {
      console.log('第三次的返回结果')
    })
}
```

然后使用 Generator 方法

但是上面代码的阅读性较差， 那么如何对上述代码进行优化

```ts
function* getData() {
  const res1 = yield requestData('adny')
  const res2 = yield requestData(res1)
  const res3 = yield requestData(res2)
  const res4 = yield requestData(res3)
  console.log('第四次请求')
}

const generator = getData()
generator.next().value.then(res) => {
  generator.next(res).value.then(res) => {
    generator.next(res).value.then(res) => {
      generator.next(res)
    }
  }
}
```

但是目前的写法有几个问题

还是需要定义几层调用 promise 的关系 甚至更多

可能需要这种执行函数还有很多， 所以可以封装一个自动执行的 generator 函数

```ts
function execGenerator(getFn) {
  const generator = getFn()
  function exec(res) {
    const result = generator.next(res)
    if (result.done) return result.value
    result.value.then((res) => {
      exec(res)
    })
  }
}
```
