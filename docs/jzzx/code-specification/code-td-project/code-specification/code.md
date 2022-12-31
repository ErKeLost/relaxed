# 项目代码规范 🐻🐻🐻

## 文件夹结构以及规范

:::tip
非必要情况不允许在`main.ts`中添加业务功能逻辑代码
:::

### 前置： 页面一一对应 不同页面对应不同功能 不同网络请求 比如

:::warning
比如我们 views 里面有一个 companyManager 假如这代表一个父页面 那么我们对应的 services 也需要有一个 companyManager 文件 一一对应
:::

### 1. components 文件夹不允许存放业务代码

:::warning
components 文件夹 只能放置 通用组件
:::

### 2. [ services, utils ] 等文件夹全部默认全量导出

```ts
import { xxx } from '@/services' // good
import { xxx } from '@/utils' // good

import { xxx } from '@/services/managementTerminal/companyUserManagement' // bad
```

:::danger
我们使用不同页面导入不同接口时 默认全部要 export {} 导出
:::

### 3. Style 样式规范

:::danger
涉及 公司环境样式问题 不能使用 css 纯样式
<br>

需要编写 css Var 例如 color: var(--el-primary--color--light-9)
:::

### 4. Pinia

:::warning
如果需要编写 pinia 代码 默认请使用 setup 书写模式 保证代码规范性
:::

### 5. Global

:::warning
如果需要添加全局组件 全局方法 请在 `@/plugins` 进行循环添加
:::
