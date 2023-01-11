---
---

# 项目搭建规范 ✨ ✨

## 一. 代码规范

### 1. git Husky 和 eslint

虽然我们已经要求项目使用 eslint 了，但是不能保证组员提交代码之前都将 eslint 中的问题解决掉了：

- 也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；

- 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

- husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用 husky 呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装 husky 相关的依赖：

![image-20210723112648927](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23d3dff94b4e479198f93f465b77b00b~tplv-k3u1fbpfcp-zoom-1.image)

2.在项目目录下创建 `.husky` 文件夹：

![image-20210723112719634](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a293b1814b8a496194eb92bd429c38c0~tplv-k3u1fbpfcp-zoom-1.image)

3.在 package.json 中添加一个脚本：

![image-20210723112817691](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/503a63b09c31441196117cbffacfdd76~tplv-k3u1fbpfcp-zoom-1.image)

接下来，我们需要去完成一个操作：在进行 commit 时，执行 lint 脚本：

![image-20210723112932943](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19734a82248e4dbc80d0de3295454ff3~tplv-k3u1fbpfcp-zoom-1.image)

这个时候我们执行 git commit 的时候会自动对代码进行 lint 校验。

### 1.5. git commit 规范

#### 1.5.1. 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8d4581c7d5241659005c24435674d55~tplv-k3u1fbpfcp-zoom-1.image)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

- Commitizen 是一个帮助我们编写规范 commit message 的工具；

  1.安装 Commitizen

```shell
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45d3e4e68ee8428fa4e7a894d9d73523~tplv-k3u1fbpfcp-zoom-1.image)

并且在 package.json 中进行配置：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbbf447f78124b07b113da16809cba54~tplv-k3u1fbpfcp-zoom-1.image)

这个时候我们提交代码需要使用 `npx cz`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c7841a4c04148c4bdb83c2fdff1cb3d~tplv-k3u1fbpfcp-zoom-1.image)

- 第三步选择提交的信息

![image-20210723150204780](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/becb19c55bbe4ec6b74538ad58c41bce~tplv-k3u1fbpfcp-zoom-1.image)

- 第四步提交详细的描述信息

![image-20210723150223287](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e34a8a089c1146a5b0351eb580e26844~tplv-k3u1fbpfcp-zoom-1.image)

- 第五步是否是一次重大的更改

![image-20210723150322122](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50cdbfd61e3c41a0af6e8db8bf2b9448~tplv-k3u1fbpfcp-zoom-1.image)

- 第六步是否影响某个 open issue

![image-20210723150407822](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6db60bf0928a40ee9755cce919a715e4~tplv-k3u1fbpfcp-zoom-1.image)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d1c085e28334d998aca87c3c2c9ffb3~tplv-k3u1fbpfcp-zoom-1.image)

#### 1.5.2. 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过 commitlint 来限制提交；

  1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```
