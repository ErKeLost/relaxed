# Node 版本管理工具 Version Manager

## Nvm for Window

- 安装
  :::tip
  [https://github.com/coreybutler/nvm-windows/releases]()
  :::

- 使用

```js
nvm install stable // 安装最新稳定版 node
nvm install <version> // 安装指定版本
nvm uninstall <version> // 删除已安装的指定版本
nvm use <version> // 切换使用指定的版本node
nvm ls // 列出所有安装的版本
nvm ls-remote // 列出所有远程服务器的版本
nvm list available // 所有可用版本
nvm list  // 已经安装版本
nvm list installed // 同 nvm list
nvm current // 显示当前的版本
`nvm alias <name> <version>`  // 给不同的版本号添加别名
nvm unalias <name> // 删除已定义的别名
nvm reinstall-packages <version> // 在当前版本 node 环境下，重新   全局安装指定版本号的 npm 包
nvm alias default [node版本号] // 设置默认版本
```

### 如果下载速度慢导致错误 可切换镜像

```js
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## Nvm for Mac

- 安装
  :::tip
  [https://github.com/nvm-sh/nvm]()
  :::
