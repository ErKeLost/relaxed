# 设计模式之策略模式 - 优化 if else 地狱问题

## 类型单条件模式（一）

```js
const orderType = 1
if (orderType === 1) {
  console.log('全部')
  // ...
} else if (orderType === 2) {
  console.log('舆情情感')
  // ...
} else if (orderType === 3) {
  console.log('敏感信息来源')
  //   ...
} else {
  console.log('非敏感来源')
  //   ...
}

const orderTypeSet = {
  1() {
    console.log('全部舆情')
  },
  2() {
    console.log('舆情情感')
  },
  3() {
    console.log('敏感信息来源')
  },
  4() {
    conosle.log('非敏感信息来源')
  }
}

orderTypeSet[orderType]()
```

## 多层条件嵌套逻辑 （一）

:::tip 多层条件嵌套
如果条件越来越多并且出现嵌套的条件层级
:::

```js
const orderType = 1 // 1: 美妆，2：电器，3：家具
const orderWay = 2 // 1：h5，2：app，3：小程序

const strategy = () => {
  // 订单类型+环境类型策略
  const map = new Map([
    [
      {
        orderType: 1,
        orderWay: 1
      },
      () => {
        console.log('美妆订单h5')
      }
    ],
    [
      {
        orderType: 1,
        orderWay: 2
      },
      () => {
        console.log('美妆订单app')
      }
    ],
    [
      {
        orderType: 1,
        orderWay: 3
      },
      () => {
        console.log('美妆订单小程序')
      }
    ],
    [
      {
        orderType: 2,
        orderWay: 1
      },
      () => {
        console.log('电器订单h5')
      }
    ],
    [
      {
        orderType: 2,
        orderWay: 2
      },
      () => {
        console.log('电器订单app')
      }
    ],
    [
      {
        orderType: 2,
        orderWay: 3
      },
      () => {
        console.log('电器订单小程序')
      }
    ],
    [
      {
        orderType: 3,
        orderWay: 1
      },
      () => {
        console.log('家具订单h5')
      }
    ],
    [
      {
        orderType: 3,
        orderWay: 2
      },
      () => {
        console.log('家具订单app')
      }
    ],
    [
      {
        orderType: 3,
        orderWay: 3
      },
      () => {
        console.log('家具订单小程序')
      }
    ]
  ])
  return map
}

const run = (orderType, orderWay) => {
  let action = [...strategy()].filter(
    ([key, value]) => key.orderType === orderType && key.orderWay === orderWay
  )
  action.forEach(([key, value]) => value.call(this))
}

run(orderType, orderWay)
```

### 解决多重嵌套条件地狱

#### 上述的多种嵌套条件的解决方案是比较简单的，现实中很难有这么完美的条件判断出现。接下来见证一下什么叫地狱的风景

```ts
const orderType = 1 // 1: 美妆，2：电器，3：家具
const orderWay = 1 // 1：h5，2：app，3：小程序
const orderMoney = 100 // 金额范围划分，0-100，100-1000，1000以上，跳转的订单详情也不相同

if (orderType === 1) {
  if (orderWay === 1) {
    if (0 <= orderMoney && orderMoney < 100) {
      console.log('美妆订单h5-0')
    } else if (orderMoney < 1000) {
      console.log('美妆订单h5-100')
    } else {
      console.log('美妆订单h5-1000')
    }
  } else if (orderWay === 2) {
    if (0 <= orderMoney && orderMoney < 100) {
      console.log('美妆订单app-0')
    } else if (orderMoney < 1000) {
      console.log('美妆订单app-100')
    } else {
      console.log('美妆订单app-1000')
    }
  } else if (orderWay === 3) {
    if (0 <= orderMoney && orderMoney < 100) {
      console.log('美妆订单小程序-0')
    } else if (orderMoney < 1000) {
      console.log('美妆订单小程序-100')
    } else {
      console.log('美妆订单小程序-1000')
    }
  }
} // 条件判断次数太多，所以此处只用了一层条件
```

#### 我们来简单分析一下上述的条件，可以将相同的策略提取出来。首先环境跟订单类型的组合可以默认已知，所以将金额条件提取出来，当作一组策略返回

```ts
const orderType = 1 // 1: 美妆，2：电器，3：家具
const orderWay = 1 // 1：h5，2：app，3：小程序
const orderMoney = 10000 // 金额范围划分，0-100，100-1000，1000以上，跳转的订单详情也不相同

const orderMoneyStrategy = (orderMoney) => {
  // 提取金额策略
  if (0 <= orderMoney && orderMoney < 100) {
    return 1
  } else if (orderMoney < 1000) {
    return 2
  }
  return 3
}

const strategy = () => {
  // 订单类型+环境类型策略
  const map = new Map([
    [
      {
        orderType: 1,
        orderWay: 1,
        orderMoney: 1
      },
      () => {
        console.log('美妆订单h5-0')
      }
    ],
    [
      {
        orderType: 1,
        orderWay: 1,
        orderMoney: 2
      },
      () => {
        console.log('美妆订单h5-100')
      }
    ],
    [
      {
        orderType: 1,
        orderWay: 1,
        orderMoney: 3
      },
      () => {
        console.log('美妆订单h5-1000')
      }
    ]
  ])
  return map
}

const run = (orderType, orderWay, orderMoney) => {
  let action = [...strategy()].filter(
    ([key, value]) =>
      key.orderType === orderType && key.orderWay === orderWay && key.orderMoney === orderMoney
  )
  action.forEach(([key, value]) => value.call(this))
}

run(orderType, orderWay, orderMoneyStrategy(orderMoney))
```

### 上述就是将两个策略拆开再组合，可以使条件逻辑更加清晰，但是从上述例子也能看出，策略模式在使用过程中并不能减少很多的代码量，并且策略越多，拆分组合的过程就会越复杂
