# ES6 ~ ES12 🥰🥰 Important！（开发常用版）

## 字符串

- 拼接字符串 使用模板字符串拼接方法

```js
const firstName = 'erkelost'
const secondName = 'adny'
// old
const fullName = firstName + '-' + secondName // erkelost-adny
// new
const fullName = `${firstName}-${secondName}` // erkelost-adny
```

## 字面量增强写法（property shorthand）/ Enhanced object literals

```js
const name = 'erkelost'
const age = 23

const person = {
  // old
  name: name,
  age: age
  // new property shorthand
  name,
  age,
  // old
  foo: function() {}
  // new methods shorthand
  bar() {}
}
```

## 计算属性名 （property computed name）

```js
const name = 'adny'
//  old
const obj = {}
obj[name + 521] = '1314'
// new
const obj = {
  [name + 521]: 1314
}
```

## 数组的结构

```js
const names = ['adny', 'erkelost']
// old
const name1 = names[0]
const name2 = names[1]
// new
const [name1, name2] = names
// 如果我们想结构最后的元素
const [, name2] = names
// 如果我们只想要结构其中的一个元素 剩下的元素放入到一个新数组中
const [name1, ...newNames] = names
// 解构 参数 冗余 设置默认值
const [name1, name2, name3 = 'value online'] = names
```

## 对象的解构

```js
const obj = {
  name: 'erkelost',
  age: 22,
  height: 200
}
// old
const name = obj.name
const age = obj.age
const height = obj.height
// new
const { name, age, height } = obj
const { age } = obj
// 如果我们想对 解构出来的值 重命名
const { name: myName } = obj // console.log(myName) : 'erkelost'
// 解构默认值
const { address: newAdress = '大连市' } = obj // console.log(newAdress) : '大连市'
// 常见函数参数应用场景
// old
function foo(info) {
  console.log(info.name, info.age)
}
// new
function bar({ name, age }) {
  console.log(name, age)
}
```

## 函数的默认参数 & 对象参数 和 默认值 以及 解构

```js
// old
function foo(m, n) {
  m = m || 'adny'
  n = n || 'erkelost'
  console.log(m, n)
}

// new syntax
function bar(m = 'adny', n = 'erkelost') {
  console.log(m, n)
}
// 对象参数
function foo({ name, age } = { name: 'adny', age: 18 }) {
  console.log(name, age)
}
```

## 函数的剩余参数 rest parameter

```js
function foo(m, n, ...args) {
  console.log(m, n) // 1, 2
  console.log(args) // [3, 4, 5]
}
foo(1, 2, 3, 4, 5)
```

:::warning arguments 是历史遗留问题
**剩余参数 ... 和 arguments 的区别 剩余参数只包含那些没有对应形参的实参， 但是 arguments 对象包含了所有传递给函数的实参， arguments 对象是一个类数组 不能进行数组的所有操作**
:::

## 展开语法 spread syntax

- 在函数调用 和 数组构造时 在 语法层面展开

```js
const names = ['erkelost', 'adny']
const name = 'er'
const obj = { name: 'erkelost' }
// 如果我们想把数组当成参数 传递给函数
// old
function foo(x, y) {
  console.log(x, y)
}
foo.apply(null, names)
// new
foo(...names) // 'erkelost', 'adny'
foo(...name) // 'e', 'r'
const newObj = { ...obj, age: 999 } // { name: 'erkelost', age: 999 }
```

## Symbol 的基本使用

```js
// 1.ES6之前, 对象的属性名(key)
// var obj = {
//   name: "why",
//   friend: { name: "kobe" },
//   age: 18
// }

// obj['newName'] = "james"
// console.log(obj)

// 2.ES6中Symbol的基本使用
const s1 = Symbol()
const s2 = Symbol()

console.log(s1 === s2)

// ES2019(ES10)中, Symbol还有一个描述(description)
const s3 = Symbol('aaa')
console.log(s3.description)

// 3.Symbol值作为key
// 3.1.在定义对象字面量时使用
const obj = {
  [s1]: 'abc',
  [s2]: 'cba'
}

// 3.2.新增属性
obj[s3] = 'nba'

// 3.3.Object.defineProperty方式
const s4 = Symbol()
Object.defineProperty(obj, s4, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 'mba'
})

console.log(obj[s1], obj[s2], obj[s3], obj[s4])
// 注意: 不能通过.语法获取
// console.log(obj.s1)

// 4.使用Symbol作为key的属性名,在遍历/Object.keys等中是获取不到这些Symbol值
// 需要Object.getOwnPropertySymbols来获取所有Symbol的key
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))
const sKeys = Object.getOwnPropertySymbols(obj)
for (const sKey of sKeys) {
  console.log(obj[sKey])
}

// 5.Symbol.for(key)/Symbol.keyFor(symbol)
const sa = Symbol.for('aaa')
const sb = Symbol.for('aaa')
console.log(sa === sb)

const key = Symbol.keyFor(sa)
console.log(key)
const sc = Symbol.for(key)
console.log(sa === sc)
```

## Set 数据结构

### 创建 Set 结构

```js
const set = new Set()
// 添加set结构
set.add(10)
set.add(20)
set.add(30)
set.add(40)
console.log(set) // Set(4) { 10, 20, 30, 40 }
// set元素不能重复
// 重复元素会被移除
set.add(10)
console.log(set) // Set(4) { 10, 20, 30, 40 }
// 但是如果我们向set里面添加空对象 那么是不会被去重的
// 因为 每次创建一个新的对象都对应的是不同的内存地址
set.add({})
set.add({})
console.log(set) // Set(4) { 10, 20, 30, 40, {}, {} }
// 但是如果我们添加 的 一个定义好的对象 那么就会被去重 因为我们定义的对象
// 变量 指向的是一个相同的 对象的内存地址
```

:::tip 应用场景
对数组进行去重
默认情况下我们对数组去重
:::

```js
// old
const arr = [1, 1, 2, 3, 4, 5, 6, 3, 4, 5, 3]
const newArr = []
for (const item of arr) {
  if (newArr.indexOf(item) !== -1) {
    newArr.push(item)
  }
}
// new
const arrset = new Set(arr)
// const newArr = Array.from(arrset)  或者还有其他另一种写法
const newArr = [...arrset]

console.log(newArr) // [1,2,3,4,5,6]
```

### 属性 和 方法

### size 属性 长度

```js
setArr.size
```

### add 方法 新增

```js
setArr.add(100)
```

### delete 方法 删除

```js
setArr.delete(30)
```

### clear 方法 清空

```js
setArr.clear() 返回一个空的set集合
```

### has 方法

```js
setArr.has() 判断集合中的 value 在不在 has 对应的值中
```

### 遍历方法 foreach for of

```js
setArr.forEach  &&  for(const item of setArr) {}
```

## weakSet 数据结构

:::tip 什么是 weakSet
weakset 和 set 类似 也是一种新增的数据结构 也是内部元素不能重复的数据机构
那他和 set 有什么区别呢

- weakset 中只能存放对象类型， 不能存放基本的数据类型
- weakset 对元素的引用是弱引用 如果没有其他的引用对某个对象进行引用 那么 GC 会自动进行垃圾回收
  :::

```js
// weakset只能存放对象类型
// TypeError: Invalid value used in weakset
const weakset = new WeakSet()
weakset.add(10)

// 对对象是一种弱引用
// 我们正常对一个元素的变量指向一个内存地址 称之为强引用
// 弱引用 就是 不会 因为 你是否指向这个内存地址 而改变GC对你所指的这个对象的内存地址的看法

let obj = {
  name: 'erkelost'
}
const set = new Set()
const weak = new WeakSet()
set.add(obj) // 强引用 就算obj 现在为null 了  还有set只想这个对象的内存地址 就不会发生垃圾回收
weak.add(obj) // 弱引用 就算obj 现在为null 了  现在这个weakset 只想这个 对象的内存地址是弱引用
// 不会引起 垃圾回收的看法 如果清空了 obj变量的引用 那么 垃圾回收就会被清除

// set 建立的是一个强引用
// weakset 建立 的是一个弱引用
```

:::warning weakset 和 set 的区别
因为 weakset 对 对象的弱引用 如果我们遍历获取到了其中的元素 会对元素造成不能正常的销毁
所以 weakset 没有 clear 方法和 不能进行遍历操作
:::

### weakset 的应用场景

```js
const weakset = new WeakSet()

class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error('不能通过非构造函数的方法创建出来的对象调用running方法')
    }
    console.log('running', this)
  }
}
```

## Map 数据结构

### map 是另外一个新增的数据结构 用于存储映射关系 对象存储只能用字符串 map 允许我们使用对象类型来作为 key

```ts
const map = new Map()
const obj = {
  name: 'erkelost'
}
map.set(obj, 'erkelost')

// map可以传递一个数组
const map = new Map([
  ['name', 'erkelost'],
  ['age', 18],
  [obj, 'adny']
])
```

### map 的属性 和 常见得方法

```ts
map.size // 获取map的长度
map.set(key, value) // 向map中添加一个键值对
map.get(key) // 获取某个键对应的值
map.has(key) // 判断map中是否有某个键
map.delete(key) // 删除某个键
map.clear() // 清空map
map.keys() // 获取所有的键
// 遍历
map.forEach((value, key, map) => {})
for (const [key, value] of map) {
}
```

```

```

## WeakMap 数据结构
