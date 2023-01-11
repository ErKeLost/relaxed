# NRM

> nrm(npm registry manager )是 npm 的镜像源管理工具，使用这个就可以快速地在 npm 源间切换

- 安装

```js
// 执行命令全局安装nrm
npm install -g nrm
```

- 使用

```js
nrm ls // 查看可选的源
nrm use taobao // 切换到taobao源
nrm add registry xxxx // 增加定制的源
`nrm add <registry> <url>` // 添加企业内部的私有源，其中reigstry为源名，url为源的路径
nrm del <registry> // 删除对应的源
nrm test //测试相应源的响应时间
```
