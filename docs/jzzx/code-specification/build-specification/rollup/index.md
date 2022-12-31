![](https://rollupjs.org/logo.svg)

# Rollup 全解析 - 附 DEMO

## 安装 rollup

```js
pnpm add rollup
```

## commonjs

:::tip
将 CommonJS 模块转换为 ES6，这样它们就可以包含在 Rollup 包中。
:::

### 如果我们默认使用 commonjs 模块来进行打包的话，那么代码是会报错的（module.exports）因为 rollup 默认支持 esmodule 但是如果我们想要正常的导出 es 模块那么我们就需要这个插件

### 安装@rollup/plugin-commonjs

```js
pnpm add @rollup/plugin-commonjs -D
```

## node-resolve

### 因为我们 rollup 默认只支持 esmodule, 我们如果导入的是 commonjs 的文件 那么他会报错 这个插件 运用 node 解析算法 对不同 文件 路径 进行解析，如果我们导入 commonjs 文件 那么就会报错

:::tip
使用 "node 解析算法" 来定位模块，用于使用 node_modules 中的第三方模块。and COMMONJS
:::

## babel-plugin

### 为了正确的被使用 和 解析我们的模块 以致于 其他浏览器能够使用，我们应该使用 babel 来进行代码编译

:::tip 为什么 需要使用 babel
如果我们的 浏览器 或者 nodejs 不支持 最新的 ECMA 特性 我们就可以使用 babel 来进行解析
使用本插件，可以通过 Babel 的能力将你所写的 es6/es7 代码编译转换为 es5 的，以适用那些更古老的浏览器。
:::

### 安装 rollup-plugin-babel

```js
pnpm add rollup-plugin-babel -D
```

## alias 插件

### alias 插件就是我们在构建包的定义时对 rollup 路径定义别名

:::tip
使用这个插件，你可以在引入文件时，使用一个 别名 来代替那些固定的路径。
:::

### 安装@rollup/plugin-alias

```js
pnpm add @rollup/plugin-alias -D
```

## beep

### 报错时 会提供 声音

:::warning
就是会发出 嘟嘟的声音
:::

```js
pnpm add @rollup/plugin-beep -D
```

## html

### 创建一个 html 文件 在其中引用 rollup 构建出来的包

```js
pnpm add @rollup/plugin-html
```

## inject

:::warning
一个 Rollup 插件，用于扫描模块的全局变量，并在必要时注入 import 语句。
:::

### 就是比如我们定义一个全局变量 我们不需要引入当前引用全局变量的包 我们可以直接使用 他会在我们打包的时候自动帮助我们 进行导入 进行 import

```js
pnpm add @rollup/plugin-inject -D
```

## multi-entry

::: warning
允许我们对一个 bundle 使用多个入口 打包到一个出口中
:::

```js
pnpm add @rollup/plugin-multi-entry -D
```

## replace

:::warning
一个 Rollup 插件，在打包时替换文件中的目标字符串。
:::

```js
pnpm add @rollup/plugin-replace -D
```

## run

:::warning
一个 Rollup 插件，一旦你的 bundle 被构建，它就会在 nodejs 中运行。
:::

```js
pnpm add @rollup/plugin-run - D
```

## strip

:::warning
一个 Rollup 插件，用于从代码中删除 debugger 语句和诸如 assert.equal 和 console.log 类似的函数。
:::

```js
pnpm add @rollup/plugin-strip -D
```

## url

:::warning
一个 `Rollup` 插件，将文件导入为 `data-URIs` 或 `esm` 格式。
可以帮助我们 在 js 中内联 其他格式
:::

### ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3de2bb8cd91d4559ab170c5b03c72db6~tplv-k3u1fbpfcp-zoom-1.image)

这样说或者有些让人摸不着头脑，通过 `demo` 或许能更容易理解。

`demo` 详解：\
`index.js` 分别引入了两个 `.png` 格式文件，分别为：

```
// test.png 7KB 大小
import test01 from './test.png'
// test02.png 16KB 大小
import test02 from './test02.png'
```

当没有 `@rollup/plugin-url` 支持时，构建（`yarn build-url-no-plugin`）行为一定会报错，因为 `js` 解析引擎无法解析 `.png` 格式的文件。

但配上 `@rollup/plugin-url` 插件后，结果会怎样呢？

```
var test01 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAAD2CAYAAAAtfpAeAAAAAXNS...(略)";

var test02 = "7822ffd3c90c0d9c.png";
```

对于两张图片的处理居然并不相同！\
为什么呢？\
官方文档解释：

> 内联文件的文件大小限制。如果一个文件超过这个限制(默认 14KB)，它将被复制到目标文件夹，并提供散列文件名。

因此， `test02.png` 被复制到了目标文件夹，并提供了一个新的基于散列的名称，而且导入的 `test02` 并不是文件，而是该文件的路径。

那么 `test` 呢？

`test` 是作为 `data URIs` 被导入的，关于这种格式,想详细了解的可以访问此文档查看: [nodejs.cn/api/esm.htm…](https://link.juejin.cn?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fesm.html%23data-imports 'http://nodejs.cn/api/esm.html#data-imports')

简单来说，通过这种形式将 `文件` 作为内联形式引入，可以减少网络请求的次数，提升页面加载速度。

（这也是为什么此插件针对小文件和大文件要采取不一样的策略的原因。）

## postcss

:::warning
all in js
:::

```js
pnpm add rollup-plugin-css  -D
```

```js
// config
export default {
  ...
  plugins: [
    postcss({
      extract: true,  // css通过链接引入
      use: ["sass"],  // 编译 sass
    })
  ],
  ...
};
```

## json

:::warning
rollup 本身不能识别 json 文件 这个插件可以帮助我们识别 json 文件
:::

```js
pnpm add @rollup/plugin-json -D
```

## terser

:::warning
代码压缩 插件 缩小体积
:::

```js
pnpm add rollup-plugin-terser - D
```

## typescript

```js
pnpm add @rollup/plugin-typescript  tslib typescript -D
```

## vue

:::warning
lib 打包的时候 我们需要用到 vue 的时候
:::

```js
// vue3
pnpm add rollup-plugin-vue @vue/compiler-sfc -D
// vue2
pnpm add rollup-plugin-vue@5.1.9 vue-tempalte-compoler
```

## postcss

:::warning
postcss 支持 scss less 和其他 css 预处理器
:::
pnpm add rollup-plugin-postcss postcss
