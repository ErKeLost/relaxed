# 代码规范

npm install pnpm -g
npm install nrm -g

## 编码规范

:::tip 统一团队的编码规范，有助于代码的维护。本章是传统意义上的 Style Guideline，目的是统一一些相对主观化的代码风格。
:::

### 1.1. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：EditorConfig for VS Code

![image-20210722215138665](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67f74aa1bbd3471386f2ce51f800650d~tplv-k3u1fbpfcp-zoom-1.image)

### 文件 命名

:::tip

#### 命名最好不要使用缩写

:::

### 项目文件夹/静态资源命名

#### 全部最好采用小写并以中划线分隔。

- Good：`color-picker`

- Bad：`colorPicker or color_picker`

### 常量 建议每个常量都需要定义命名

#### 统一使用全大写并有下划线连接

- Good : `COUNT_VALUE`

- Bad ： `count_value/countValue`

### 字符串

#### 定义变量字符串尽量统一使用 单引号

```js
Good : const name = 'erkelost'

Bad ：const name = 'adny'
```

#### 使用模板字符串书写字符串

```js
Good : const name = erkelost + '-' + adny

Bad ：const name = `${adny}-${erkelost}`
```

#### 尽量使用 ES6 语法 简介明了 举出几个例子

- 用扩展运算符做数组浅拷贝

```js
// bad
let arr = [1, 2, 3]
const len = arr.length
const copyArr = []
for (let i = 0; i < len; i += 1) {
  copyArr[i] = arr[i]
}
// good
const copyArr = [...arr]
```

- 数组结构

```js
const arr = [1, 2, 3, 4]

// bad
const first = arr[0]
const second = arr[1]

// good
const [first, second] = arr
```

#### 用对象的解构赋值来获取和使用对象某个或多个属性值。

```js
// bad
function getFullName(user) {
  const firstName = user.firstName
  const lastName = user.lastName

  return `${firstName} ${lastName}`
}

// good
function getFullName(user) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`
}
```

#### 优先使用 rest 语法...，而不是 arguments。

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments)
  return args.join('')
}

// good
function concatenateAll(...args) {
  return args.join('')
}
```

#### 箭头函数 如果要用匿名函数做回调，最好使用箭头函数

```js
// bad
;[1, 2, 3].map(function (x) {
  const y = x + 1
  return x * y
})

// good
;[1, 2, 3].map((x) => {
  const y = x + 1
  return x * y
})
```

- ### 异步请求

#### 如果有嵌套调用的接口 为了防止回调地狱 this 指向等问题 统一使用 async/await && 箭头函数

- Good: `await getUserData()`

- Bad ： `getUserData().then(res => {})`

### 自定义组件

- 组件名为多个单词必要组件名应该始终是多个单词的，根组件 App 以及 `<transition></transition>`, `<component></component>` 之类的 Vue 内置组件除外。
  :::warning 单文件组件的文件名 要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
  单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。
  :::
