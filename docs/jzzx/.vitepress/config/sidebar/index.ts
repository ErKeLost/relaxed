import { h } from 'vue'
export const sidebar = {
  // '/guide/': [
  //   {
  //     text: 'Essentials',
  //     items: [
  //       { text: 'Introduction', link: '/guide/introduction' },
  //       { text: 'Installation', link: '/guide/installation' },
  //       {
  //         text: 'Application & Component Instances',
  //         link: '/guide/instance'
  //       },
  //       { text: 'Template Syntax', link: '/guide/template-syntax' },
  //       {
  //         text: 'Data Properties and Methods',
  //         link: '/guide/data-methods'
  //       },
  //       {
  //         text: 'Computed Properties and Watchers',
  //         link: '/guide/computed'
  //       },
  //       {
  //         text: 'Class and Style Bindings',
  //         link: '/guide/class-and-style'
  //       },
  //       { text: 'Conditional Rendering', link: '/guide/conditional' },
  //       { text: 'List Rendering', link: '/guide/list' },
  //       { text: 'Event Handling', link: '/guide/events' },
  //       { text: 'Form Input Bindings', link: '/guide/forms' },
  //       { text: 'Components Basics', link: '/guide/component-basics' }
  //     ]
  //   },
  //   {
  //     text: 'Components In-Depth',
  //     items: [
  //       {
  //         text: 'Component Registration',
  //         link: '/guide/component-registration'
  //       },
  //       { text: 'Props', link: '/guide/component-props' },
  //       { text: 'Non-Prop Attributes', link: '/guide/component-attrs' },
  //       { text: 'Custom Events', link: '/guide/component-custom-events' },
  //       { text: 'Slots', link: '/guide/component-slots' },
  //       {
  //         text: 'Provide / inject',
  //         link: '/guide/component-provide-inject'
  //       },
  //       {
  //         text: 'Dynamic & Async Components',
  //         link: '/guide/component-dynamic-async'
  //       },
  //       { text: 'Template refs', link: '/guide/component-template-refs' },
  //       {
  //         text: 'Handling Edge Cases',
  //         link: '/guide/component-edge-cases'
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Transitions & Animation',
  //     items: [
  //       { text: 'Overview', link: '/guide/transitions-overview' },
  //       {
  //         text: 'Enter & Leave Transitions',
  //         link: '/guide/transitions-enterleave'
  //       },
  //       { text: 'List Transitions', link: '/guide/transitions-list' },
  //       { text: 'State Transitions', link: '/guide/transitions-state' }
  //     ]
  //   },
  //   {
  //     text: 'Reusability',
  //     items: [
  //       { text: 'Mixins', link: '/guide/mixins' },
  //       { text: 'Custom Directives', link: '/guide/custom-directive' }
  //     ]
  //   },
  //   {
  //     text: 'Composition API',
  //     items: [
  //       {
  //         text: 'Introduction',
  //         link: '/guide/composition-api-introduction'
  //       },
  //       { text: 'Setup', link: '/guide/composition-api-setup' },
  //       {
  //         text: 'Lifecycle Hooks',
  //         link: '/guide/composition-api-lifecycle-hooks'
  //       },
  //       {
  //         text: 'Provide / Inject',
  //         link: '/guide/composition-api-provide-inject'
  //       },
  //       {
  //         text: 'Template Refs',
  //         link: '/guide/composition-api-template-refs'
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Advanced',
  //     items: [
  //       { text: 'Teleport', link: '/guide/teleport' },
  //       { text: 'Render Function', link: '/guide/render-function' },
  //       { text: 'Plugins', link: '/guide/plugins' }
  //     ]
  //   },
  //   {
  //     text: 'Digging Deeper',
  //     items: [
  //       { text: 'Reactivity in Depth', link: '/guide/reactivity' },
  //       {
  //         text: 'Reactivity Fundamentals',
  //         link: '/guide/reactivity-fundamentals'
  //       },
  //       {
  //         text: 'Reactivity in Computed and Watch',
  //         link: '/guide/reactivity-computed-watchers'
  //       },
  //       {
  //         text: 'Rendering Mechanisms and Optimizations',
  //         link: '/guide/optimizations'
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Tooling',
  //     items: [
  //       {
  //         text: 'Single File Components',
  //         link: '/guide/single-file-component'
  //       },
  //       { text: 'Testing', link: '/guide/testing' },
  //       { text: 'TypeScript Support', link: '/guide/typescript-support' },
  //       { text: 'Mobile', link: '/guide/mobile' },
  //       {
  //         text: 'Production Deployment',
  //         link: '/guide/tooling/deployment'
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Scaling Up',
  //     items: [
  //       { text: 'Routing', link: '/guide/routing' },
  //       { text: 'State Management', link: '/guide/state-management' },
  //       { text: 'Server-Side Rendering', link: '/guide/ssr' }
  //     ]
  //   },
  //   {
  //     text: 'Accessibility',
  //     items: [
  //       { text: 'Basics', link: '/guide/a11y-basics' },
  //       { text: 'Semantics', link: '/guide/a11y-semantics' },
  //       { text: 'Standards', link: '/guide/a11y-standards' },
  //       { text: 'Resources', link: '/guide/a11y-resources' }
  //     ]
  //   }
  // ],
  '/vueuse': [
    {
      text: 'VueUse源码解析',
      items: [{ text: 'UseTitle', link: '/vueuse/source-code/useTitle/useTitle' }]
    }
  ],
  '/algorithm': [
    {
      text: 'JavaScript算法与数据结构',
      items: [
        { text: 'CPU， 寄存器， 内存', link: '/algorithm/cpu' },
        { text: '算法与数据结构', link: '/algorithm/learn/index.md' },
        { text: 'TypeScript实现十大排序算法(一): 冒泡排序', link: '/algorithm/bubblingSort2' },
        { text: 'TypeScript实现十大排序算法(二) - 选择排序', link: '/algorithm/selection' },
        { text: 'TypeScript实现十大排序算法(三) - 插入排序', link: '/algorithm/insertSort2' },
        { text: 'TypeScript实现十大排序算法(四) - 归并排序', link: '/algorithm/mergeSort' },
        { text: 'TypeScript实现十大排序算法(五) - 快速排序', link: '/algorithm/quickSort' },
        { text: 'TypeScript实现十大排序算法(六) - 堆排序', link: '/algorithm/heapSort' },
        // TypeScript实现十大排序算法(五) - 快速排序
        { text: '二分查找法', link: '/algorithm/binarySearch' },
        { text: '插入排序', link: '/algorithm/insertSort' },
        { text: '冒泡排序', link: '/algorithm/bubblingSort' }
      ]
    }
  ],
  dataStruct: [
    {
      text: 'JavaScript算法与数据结构',
      items: [
        {
          text: '线性 数组 栈结构',
          link: '/dataStruct/stack'
        },
        {
          text: '队列结构',
          link: '/dataStruct/queue'
        },
        {
          text: '链表结构',
          link: '/dataStruct/link-list'
        },
        {
          text: '大 O 表示法',
          link: '/dataStruct/gig-o-representation'
        }
      ]
    }
  ],
  '/nest': [
    {
      text: 'NestJS 设计与实战',
      items: [
        { text: '编程思想', link: '/nest/thought/index' },
        { text: '核心概念', link: '/nest/thought/concept' },
        { text: 'MVC', link: '/nest/thought/mvc' },
        { text: 'http 数据传输', link: '/nest/thought/http' },
        { text: 'ioc 解决的问题', link: '/nest/thought/ioc' },
        { text: 'aop 架构的好处', link: '/nest/thought/aop' },
      ]
    }
  ],
  '/vue': [
    {
      text: '权衡的艺术',
      items: [
        { text: '命令式和声明式', link: '/vue/source-code/art/order' },
        { text: '性能和可维护性的权衡', link: '/vue/source-code/art/pref' },
        { text: '虚拟dom性能到底如何', link: '/vue/source-code/art/vnode' },
        { text: '编译时和运行时', link: '/vue/source-code/art/runtime' }
      ]
    },
    {
      text: '@vue/reactivity',
      items: [
        {
          text: '实现 effect & reactive & 依赖收集 & 触发依赖',
          link: '/vue/source-code/reactivity/effect-reactive'
        }
      ]
    }
  ],
  '/typescript': [
    {
      text: '基础知识',
      items: [
        { text: 'TypeScript基础', link: '/typescript/learn/basics' },
        {
          text: 'TypeScript类的使用',
          link: '/typescript/learn/class'
        }
      ]
    },
    {
      text: '高级进阶',
      items: [
        {
          text: 'TypeScript高级进阶',
          link: '/typescript/learn/advanced'
        },
        {
          text: 'TypeScript项目实战',
          link: '/typescript/learn/actualCombat'
        }
      ]
    }
  ],
  '/javascript': [
    {
      text: 'Design pattern',
      items: [{ text: 'Strategy mode', link: '/javascript/design/strategy' }]
    },
    {
      text: 'JavaScript',
      items: [
        {
          text: 'ES6 - ES12',
          link: '/javascript/es6/index'
        },
        {
          text: 'constructor function & class',
          link: '/javascript/constructorFunction/index'
        },
        {
          text: 'prototype chain & extend & polymorphism',
          link: '/javascript/constructorFunction/extend'
        },
        {
          text: 'Promise',
          link: '/javascript/promise/index'
        },
        {
          text: 'Async Function',
          link: '/javascript/async/index'
        },
        {
          text: 'Event Loop',
          link: '/javascript/eventLoop/index'
        },
        {
          text: 'Error',
          link: '/javascript/error/index'
        },
        { text: 'This', link: '/javascript/this/index' },
        { text: 'Call Apply Bind', link: '/javascript/call/index' },
        {
          text: 'Debounce Throttle DeepClone',
          link: '/javascript/advanced/index'
        }
      ]
    }
  ],
  '/log/': [
    {
      text: '目录',
      items: [
        { text: '文档', link: '/log/docs/index' },
        { text: 'JZZX-CLI', link: '/log/cli/index' }
      ]
    }
  ],
  '/vue/core': [
    {
      text: '@jzzx/cli模板下载',
      items: [
        { text: 'Vue3 + Ts4.x + vite2.9', link: '/vue/core/vue3' },
        {
          text: 'Vue3 + Ts4.x + vite2.9 - Mobile',
          link: '/vue/core/vue3-mobile'
        }
      ]
    }
  ],
  '/vue/vuex/': [
    {
      text: '基础',
      items: [
        { text: 'Vue2使用Vuex', link: '/vue/vuex/index' },
        { text: 'Vue3使用Vuex', link: '/vue/vuex/vue2' },
        { text: 'Vue2使用Pinia', link: '/vue/pinia/vue2' },
        { text: 'Vue3使用Pinia', link: '/vue/pinia/vue3' }
      ]
    }
  ],
  '/cli/': [
    {
      text: '基础',
      items: [
        { text: '安装', link: '/cli/install/index' },
        { text: '快速开始', link: '/cli/quick-start/index' }
      ]
    }
  ],
  '/code-specification/': [
    // {
    //   text: "基础项目代码规范",
    //   items: [
    //     {
    //       text: `项目所有依赖网站 🚀🚀`,
    //       link: "/code-specification/code-td-project/code-specification/deps",
    //     },
    //     {
    //       text: `项目启动Ing.... ✨✨✨`,
    //       link: "/code-specification/code-td-project/code-specification/index",
    //     },
    //     {
    //       text: `代码结构规范 🔥🔥`,
    //       link: "/code-specification/code-td-project/code-specification/code",
    //     },
    //     {
    //       text: "代码书写 规范 😊😊",
    //       link: "/code-specification/code-td-project/code-specification/type",
    //     },
    //   ],
    // },
    {
      text: '前端包管理器规范',
      items: [
        {
          text: `pnpm`,
          link: '/code-specification/package-specification/pnpm/index'
        },
        {
          text: 'nvm',
          link: '/code-specification/package-specification/nvm/index'
        },
        {
          text: 'nrm',
          link: '/code-specification/package-specification/nrm/index'
        }
      ]
    },
    {
      text: '前端构建规范',
      items: [
        {
          text: 'Esbuild',
          link: '/code-specification/build-specification/esbuild/index'
        },
        {
          text: 'Webpack5',
          link: '/code-specification/build-specification/webpack/index'
        },
        {
          text: 'Vite',
          link: '/code-specification/build-specification/vite/index'
        },
        {
          text: 'Rollup',
          link: '/code-specification/build-specification/rollup/index'
        }
      ]
    },
    {
      text: '前端代码检视插件规范',
      items: [
        {
          text: 'Eslint，Prettier代码规范',
          link: '/code-specification/check-specification/eslint/index'
        }
      ]
    },
    {
      text: '前端项目结构规范',
      items: [
        {
          text: '项目提交代码规范',
          link: '/code-specification/structure-specification/structure/index'
        }
      ]
    },
    {
      text: '前端代码规范',
      items: [
        {
          text: '团队书写规范',
          link: '/code-specification/structure-specification/code/index'
        },
        {
          text: 'ES6 - ES12',
          link: '/code-specification/write-specification/es6/index'
        },
        {
          text: 'JavaScript代码规范',
          link: '/code-specification/write-specification/javascript/index'
        },
        {
          text: 'TypeScript代码规范',
          link: '/code-specification/write-specification/typescript/index'
        }
      ]
    },
    {
      text: '项目搭建规范',
      items: [
        { text: `Vue2项目搭建`, link: '/guide/introduction' },
        { text: 'Vue3 + Ts 项目搭建', link: '/guide/introduction' }
      ]
    }
  ]
}
