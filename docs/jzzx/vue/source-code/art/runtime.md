# 运行时和编译时 ❤️❤️

## 设计框架的选择

### 当我们设计框架的时候 我们有三种选择， 纯运行时， 纯编译时， 编译时 + 运行时

### 比如我们设计了一个框架 它提供了一个 render 函数 用户提供数据对象 然后使用 Render 函数递归 将数据渲染成 dom 元素 规定的数据结构如下

```ts
const obj = {
  tag: 'div',
  children: [
    tag: 'span', children: 'hello erkelost'
  ]
}

function Render(obj, root) {
  const el = document.createElement(obj.tag)
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (obj.children) {
    obj.children.forEach(item => Render(item, el))
  }
  root.appendChild(el)
}
```

### 如果有了这个函数 我们就可以这么使用他

```ts
const obj = {
  tag: 'div',
  children: [{ tag: 'span', children: '666' }]
}
Render(obj, document.body)
```

### 我们编写的这种 render 函数 就是一个纯运行时框架， 但是为了满足用户需求 如果给用户提供可以使用 html 字符串的写法，那么我们这个就不行了 我们可以编写一个 compiler 程序 作用是把 html 字符串 先转成 dom 结构的数据对象 再去 Render（）

### 这样我们的代码就变成了 运行时 + 编译时 用户可以提供 html 片段进行编译 准确的说是运行时编译

### 纯编译时框架 我们可以直接把 html 字符串编译成数据对象 也可以直接编译成命令式代码 只需要一个 compile 连 Render 都不需要了
