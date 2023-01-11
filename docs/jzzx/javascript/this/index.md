# 彻底搞定之 this 指向

## 我们为什么要使用 this

:::tip 从某些角度说
开发中如果没有 this 很多问题我们也是可以解决的
但是没有 this 会让我们编写代码非常的不方便
我们每次修改一次对象名称 都需要 修改 this
:::

```js
var objj = {
  name: 'why',
  eating: function () {
    console.log(objj.name)
  },
  running: function () {
    console.log(objj.name)
  }
}
var infop = {
  name: 'ereklost',
  eating: function () {
    console.log(infop.name)
  },
  running: function () {
    console.log(infop.name)
  }
}
```

## this 在全局作用域指向什么呢

:::tip 大多数情况下 this 一般都是出现在函数中的
在全局作用域下
浏览器 window
Node {} 内部会调用函数.apply({})
:::

## this 指向什么呢

:::tip 所有的函数在被调用时， 都会创建一个执行上下文
this 是动态绑定的 在函数执行时 才会绑定 所以有非常多不同的绑定规则
this 指向什么 跟 函数所处位置是没有关系的
:::

```js
function foo() {
  console.log(this)
}

foo() // window

var obj = {
  name: 'why',
  foo // obj
}

foo.apply('abc') // 'abc'
```

## this 到底是怎么样的绑定规则

:::warning 第一种默认绑定
默认绑定 就是 独立函数调用 只要是 独立函数调用 那么所有的 this 都指向 window
:::

```js
// 简单案例
function foo() {
  console.log(this) // window
}

// 中等案例
function foo1() {
  console.log(this) // window
}
function foo2() {
  console.log(this)
  foo1() // window
}
function foo3() {
  console.log(this)
  foo2() // window
}
foo3() // window

// 复杂案例
var obj = {
  foo() {
    console.log(this)
  }
}

var bar = obj.foo
bar() // window

// 案例4

function foo() {
  console.log(this)
}
var obj = {
  name: '',
  foo
}
var bar = obj.foo
bar() // window

// 案例五
function foo() {
  function bar() {
    console.log(this)
  }
  return bar
}

var fn = foo()
fn() // window
```

:::warning 隐式绑定
另一种比较常见的调用方式是通过某个对象进行调用 就是他调用的位置 是通过对象发起的函数调用

具体理解就是 Obj.fn()
object 对象会被 js 引擎绑定到 fn 函数中的 this, 不是我们刻意的绑定 就是隐式绑定
:::

```js
var obj = {
  name: 'erkelost',
  foo() {
    console.log(this)
  }
}
obj.foo() // obj{}
```

:::warning 显式绑定
隐式绑定的一个前提条件： 必须在调用的对象的内部有一个属性对函数的引用， 通过这个引用 把 this 绑定到这个对象上

如果我们不希望在对象内部包含对这个函数的引用 同时又希望在这个对象上进行强制调用 那么我们改怎么做呢 js 为我们提供了 在 js 环境中 所有的函数都可以使用 call 和 apply 方法
:::

```js
// call apply bind
function foo() {
  console.log('Hello')
}
foo.call() // call 也可以帮助我们调用函数
foo.apply() // apply 也可以帮助我们调用函数
foo()
```

:::warning 为什么需要显示调用
foo 直接调用的时候指向的全局对象（window）
如果我们不想在对象中添加引用 但是还是想要获取到对象中的属性 那么我们需要怎么做呢
:::

```js
function foo() {
  console.log('Hello'， this)
}
var obj = {
  name: 'adny'
}

// call 和 apply 就是可以指定this的位置
foo.call(obj)
foo.apply(obj)
foo.call(123456)
```

:::tip
call 和 apply 的区别
相同点 call 和 apply 都是 可以明确的绑定 this， 所以绑定规则也称之为显示绑定
不同点 后续再说
:::

```js
function sum(num1, num2) {
  console.log(num1 + num2, this);
}
sum.call('call', 20, 50)
sum.apply('apply, [500, 600])
```

:::tip bind
默认情况下 我们如果 给许多函数添加了显示绑定 我们需要每次都去执行 foo.call
bind 函数不仅在帮助我们绑定 this 的情况下 还帮助我们返回一个新对象 并且这个新对象的 this 指向的 this 永远都是 bind 绑定的 this
所以我们在每次调用 newFoo 的时候 就会他的 this 就是原来绑定的 this
我们还回发现 在直接调用 newFoo 的时候 我们默认绑定很像
newFoo 现在 就是 默认绑定 和 bind 绑定互相冲突 这里就会出现优先级的问题，
显示绑定的优先级大于默认绑定 所以 this 指向的是'bind'
:::

```js
function foo() {
  console.log(this)
}
foo.call('aaa')
foo.call('aaa')
foo.call('aaa')
foo.call('aaa')
foo.call('aaa')

var newFoo = foo.bind('bind')
newFoo()
```

:::warning 最后一个绑定规则 new 绑定
我们通过 new 关键字调用一个函数时 这个时候 this 时在调用这个构造器函数创建出来的对象 并且返回 this
this 就等于 创建出来的对象
这个绑定过程就是 new 绑定
:::

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
const p = new Person('zhaoyihao', 30)
```

## 那么四种绑定规则的优先级是怎样的呢 ？

### 如果一个函数同时调用了 多条规则 谁的优先级更高呢

- 默认绑定的优先级是最低的 独立的函数调用
- 显示绑定的优先级是高于隐式绑定的

```js
function adny() {
  console.log(this)
}
var obj = {
  name: 'erkelost',
  foo() {
    console.log(this)
  },
  adny: adny.bind('666')
}
obj.foo() // this: obj
obj.foo.call('123') // this: 123

var bar = obj.foo.bind('456')
bar() // this: 456
obj.adny() // this: 666
```

::: tip 显示绑定优先级高于隐式绑定
不管是 call ， apply ， 还是 bind 绑定 this 的优先级都是高于隐式绑定和默认绑定的
:::

- new 绑定优先级高于隐式绑定
  我们判断 是通过 obj 的隐式绑定还是通过 new 出来的 foo 函数 的绑定 出来 this 判断谁的优先级更高

```js
var obj = {
  name: 'obj',
  foo() {
    console.log(this)
  }
}
var f = new obj.foo() // this: foo
```

- new 的绑定优先级 高于显示绑定

```js
function foo() {
  console.log(this)
}

var bar = foo.bind('aaa')

var obj = new bar() // this: foo
```

:::tip 小提示： 特殊绑定情况 （特殊的显示绑定）
call, apply, bind 在传入 null undefined 中 自动将 this 转换为全局对象
:::

## 箭头函数

### 箭头函数 不会绑定 this ， arguments 不能和 构造函数一起使用

```js
var name = 'why'
var foo = () => {
  console.log(this)
}
foo()
var obj = { foo } // window
obj.foo() // window
foo.call('12313') // window
```

### 在一些内置函数中的 this 指向

### setTimeout

```js
var obj = {
  data: [],
  getData() {
    var _this = this
    setTimeout(function () {
      this.data = [1, 2, 3] // data is undefined in this
    }, 2000)
  }
}
```

### 这种写法是会报错的 setTimeout 内置函数 源码默认直接调用 fn 就是 默认绑定 默认绑定 this 指向 window

### 所以我们可以使用箭头函数 箭头函数中 寻找上层作用域的 this 就是 obj 的 this

```js
var obj = {
  data: [],
  getData() {
    var _this = this
    setTimeout(() => {
      this.data = [1, 2, 3] // data is undefined in this
    }, 2000)
  }
}
```
