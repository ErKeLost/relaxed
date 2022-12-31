# ESlint 配置规范

## 安装

### 临时执行 eslint 安装

```js
npx eslint --init // 临时执行eslint 安装依赖
```

### npx 命令 自动化配置 我们以 Vue3 + Ts 为例

```js
? How would you like to use ESLint? ...
  To check syntax only
> To check syntax and find problems // ✔️✔️
  To check syntax, find problems, and enforce code style
```

:::tip 为什么不使用第三个？ 业界常常认为我们的代码格式化是交给 prettier
:::

```js
? What type of modules does your project use? ...
> JavaScript modules (import/export) // ✔️✔️
  CommonJS (require/exports)
  None of these
```

```js
? Which framework does your project use? ...
  React
> Vue.js // ✔️✔️  选择框架
  None of these
? Does your project use TypeScript? » No / Yes // 选择是否使用typescript
```

```js
? Does your project use TypeScript? » No / Yes // may be
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser // ✔️✔️
√ Node
```

```js
? What format do you want your config file to be in? ...
> JavaScript // eslint 对js 最友好 所以我们 最好把配置文件放在js文件中
  YAML
  JSON
? Would you like to install them now with npm? » No / Yes
```

## 配置校验规则 ：Vue3 Config File

### 我们打开.eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier的缩写
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    // 'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制最大行数 300
    // "max-lines": ["warn", { "max": 1200 }],
    // 强制函数最大代码行数 50
    // 'max-lines-per-function': ['warn', { max: 70 }],
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    semi: ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    // 'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    // "spaced-comment": "warn",
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'no-useless-escape': 'warn',
    'no-irregular-whitespace': 'warn',
    'no-prototype-builtins': 'warn',
    'no-fallthrough': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-case-declarations': 'warn',
    'no-async-promise-executor': 'warn'
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
```

:::tip "extends" && "plugins" 的区别
extends 是 除了我们自己定义的 rules 之外的预设定 规则
plugins 是 其他的一些插件校验
两者 都是 添加其他的校验 插件 规则
:::

## 添加脚本

- eslint 默认只校验 js 文件 所以我们需要配置不同的 -ext 后缀来指定 需要校验的文件类型

```js
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
    // 如果我们需要校验别的文件
    "lint": "eslint . --ext .ts,.vue,.js,.tsx"
  }
```

# Prettier 代码格式化

## Eslint 是做代码的校验 Prettier 才做代码格式化

- 需要安装两个插件

```js
yarn add -D prettier eslint-plugin-prettier
```

:::tip 为什么明明 prettier 就能做代码格式化 我们还需要装 eslint 的插件呢
真正执行代码校验任务的工具 还是 eslint 如果我们 能够让 eslint 在我们抛出错误的时候
可以由 eslint 来去定位 并且格式化 是相当合理的 我们需要把 Eslint 当作一个主控者来管理
:::

- 我们还要防止 eslint 和 prettier 发生冲突 我们还需要安装, 如果我们当前是使用 vue 来安装项目 那么会自动帮助我们安装

```js
npm i eslint-plugin-prettier eslint-config-prettier -D
```

- 然后我们要给 .eslintrc.js 文件中 extends 添加 Prettier

```js
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        // "plugin:vue/essential",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        // "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
```

- 新建 .perttierrc.js 文件

```js
module.exports = {
  // printWidth: 80,
  // tabWidth: 2,
  // useTabs: false,
  semi: false, // 未尾逗号, default:  true
  singleQuote: true, // 单引号 default: false
  // quoteProps: 'as-needed',
  // jsxSingleQuote: false,
  trailingComma: 'none', // 未尾分号 default: es5    all | none | es5
  // bracketSpacing: true,
  // bracketSameLine: false,
  // jsxBracketSameLine: false,
  arrowParens: 'avoid', // default: always
  // insertPragma: false,
  // requirePragma: false,
  proseWrap: 'never',
  // htmlWhitespaceSensitivity: 'css',
  // vueIndentScriptAndStyle: false,  // .vue 缩进
  endOfLine: 'auto' // default lf
}
```

::: tip Script
paackage.json 添加 script prettier --write .
:::

### 根目录新建 .prettierignore && .eslintrcignore 来设置我们校验与格式化需要忽略的文件

```js
node_modules
dist
```
