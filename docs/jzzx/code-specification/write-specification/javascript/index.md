---
---

# JavaScript 代码规范

## 语言规范

JavaScript 是一种客户端脚本语言，以下编写 JavaScript 时需要遵守的规则。

### 类型引用

- 禁止使用引用 Var 定义变量 禁止代码中同时使用 Var 和 Let 防止暂时性死区
  :::warning 原因：这样做可以确保你无法重新分配引用，以避免出现错误和难以理解的代码 var 可以重复声明 导致代码 难以理解
  :::

```js
// 可以重复定义变量
var foo = 'erkelost'
var foo = 'adny'
```

- const 和 let 都是块级作用域，

```js
// const and let only exist in the blocks they are defined in.
{
  let value = 'erkelost'
  const online = 'adny'
}
console.log(value) // ReferenceError
console.log(online) // ReferenceError
```

- 定义变量 对所有引用都使用 const，不要使用 var，eslint: prefer-const, no-const-assign

```js
// bad
var value = 'erkelost'
var online = 'adny'

// good
const value = 'erkelost'
const online = 'adny'
```

- 如果引用是可变动的，使用 let 代替 var，eslint: no-var

```js
// bad
var count = 1
if (count < 10) {
  count += 1
}

// good
let count = 1
if (count < 10) {
  count += 1
}
```

- 那么我们如何定义变量
  ::: danger var 因为存在 作用于提升 window 全局对象添加属性 没有块级作用域等问题都是 历史遗留问题
  **实际开发中 `我们禁止使用var 来定义变量`
  所以我们优先 使用 const 保证数据安全性 不会被随意的修改 如果 后续我们发现了 这个变量可能会被修改
  我们 可以再去修改为 let**
  :::

- 请使用字面量值创建对象，eslint: no-new-object

```js
// bad
const a = new Object{}

// good
const a = {}
```

### 函数

- 在创建函数的时候 我们最好建议使用剪头函数

```js
;[1, 2, 3].forEach((item) => {})
```

:::warning 它将创建在 this 上下文中执行的函数，并且语法更简洁, 不需要再去声明 this 变量传递
:::

### 比较运算符&相等

- 使用 === 和 !== 而非 == 和 !=

:::warning 在判断两个变量或值是否相等时， 必须使用 “ === ” 全等
:::
