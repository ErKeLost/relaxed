<!-- # Stock To Update  ✨✨

## 项目启动 🎨🎨🎨

```ts
```

:::warning
兼容性注意

Vite 需要 Node.js 版本 >= 14.6.0。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
#### 项目未来使用Vite3.0 Node版本 >= 16

#### 为了兼容 原来项目 请使用nvm进行版本依赖切换
:::

## 现在可以试试 🔲🔲🔲

> 环境依赖

### nvm 安装

[点击我查看如何使用 😃😃😃](/code-specification/package-specification/nvm/index.html)
<br>

[点击我直接下载 😊😊😊](https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe)

#### 为了防止其他项目启动报错 建议安装

`Version 14.17.6` `nvm install 14.17.6` `nvm use 14.17.6`
<br>

`Version 16.9.0` `nvm install 16.9.0` `nvm use 16.9.0`

### 环境安装

```ts
npm install pnpm -g // 高性能 包 管理器
npm install nrm -g // npm 仓库管理
```

> 项目启动

```ts
pnpm install // 安装依赖

pnpm dev // 默认启动 dev环境变量
```

> Build

```ts
pnpm build:ignore // 默认环境打包

// 举例说明
pnpm build:b // 自定义 不同 公司环境打包
pnpm build:a // 自定义 不同 公司环境打包
pnpm build:c // 自定义 不同 公司环境打包
```

> Build All

### 环境打包问题

#### 默认打包不同公司会覆盖当前包

#### 建议使用
```ts
pnpm build:all // 默认环境打包
```
:::warning
#### build:all 打包方式 在本地生成文件夹 不同公司对应不同文件夹 进行判断
::: -->
