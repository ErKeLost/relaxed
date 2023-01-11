# 虚拟 dom 性能到底如何？ ✨✨

## 虚拟 Dom

#### 前文说到声明式代码消耗的性能 = 找出代码差异消耗的性能 + 命令式消耗的性能

#### 因此我们只需要最小化的找到差异的性能消耗 就可以让声明式性能无限的接近命令式代码， 所谓虚拟 dom 就是为了最小化的找出差异性能消耗而出现的

#### 这也导致了理论上采用虚拟 dom 的技术是不可能比原生 js 操作 dom 性能更快，但是我们如何才能写出一段高性能的命令式代码 即使你写出了 也需要耗费很大的精力 投入和产出不成正比

#### 那么什么方法能让我们不用付出太多努力 还能够保证应用程序的性能下限 想办法逼近命令式代码的性能呢，这就是虚拟 dom 需要解决的问题

## InnerHtml

:::warning
操作原生 JavaScript 是指我们 document.createElement 等 dom 操作， 并不包括 innerhtml
:::

#### InnerHtml 操作页面和虚拟 dom 操作页面性能相比如何， InnerHtml 和 document.createElement 等操作 dom 有何差异

### 比较 innerHTML 和 虚拟 dom 的性能 对于 innerHTML 来说 为了创建页面我们需要构建一段 HTML 字符串

```ts
const html = `<div>123456412313212</div>`
div.innerHTML = html
```

#### 解析上面的代码 为了渲染页面的 div 首先把字符串解析成 Dom 树 操作 Dom 和 操作原生 JavaScript 计算性能是不在一个层级的， 基于这个背景 我们可以给创建 innerHTML 创建一个表达式

```ts
;`innerHTML创建页面 = HTML字符串拼接计算量 + innerHTML dom操作计算量`
```

#### 虚拟 dom 创建页面渲染时的性能 第一步创建 javascript 对象 然后 第二步 循环遍历这些虚拟 dom 对象 并且创建真实 dom 用公式来表达

```ts
;`虚拟dom创建页面 = 创建虚拟dom对象 vnode + 递归创建真实dom dom操作计算量`
```

:::tip
如果单纯这么看 虚拟 dom 和 innerHTML 都是需要创建真实 dom 可能会感觉虚拟 dom 相比 innerHTML 没有优势可言 甚至性能可能会更差
:::

### 重头戏 InnerHtml

#### 我们在使用 innerhtml 创建页面 修改时 我们做的操作是重新构建字符串 完了再去设置 dom 的 innerHTML 属性， 也就是说 我们只要改了一个文字 也是要重新设置 innerHTML 我们经常会去修改 style,可能我们只是修改了一个颜色 也是需要 全部重新构建 innerHTML 就相当于 销毁所有旧的 dom 元素 然后在全量创建新的 dom 元素 ，

### 重头戏 虚拟 dom

#### 虚拟 dom 重新创建 javascript 对象 然后比较新旧的寻你 dom 我们只会去找变化的元素去改变他 可以发现 在更新页面的时候 虚拟 dom 在 js 的运算层面会多了一个 diff 算法的性能消耗 ， 但是毕竟是 js 层面的运算，所以不会产生数量级的差异 然后我们再去观察 dom 层消耗 虚拟 dom 只会更新内些 需要更新的元素 而 innerHTML 还是全量更新 这时候 虚拟 dom 的优势就体现出来了

### 总结 所以我们可以粗略的总结一下 innerHTML 虚拟 dom 原生 javascript

| 操作方式        | 心智负担 | 可维护性 | 性能     |
| --------------- | -------- | -------- | -------- |
| innerHTML       | 中等     | 凑活     | 最差     |
| 虚拟 Dom        | 小       | 最强     | 性能不错 |
| 原生 javascript | 最大     | 太差     | 性能高   |
