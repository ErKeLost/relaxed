# 插入排序


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6c577e966854cc49ee5f032fac5cd83~tplv-k3u1fbpfcp-watermark.image?)


问题抽象


A: 已排序数组
x: 需要插入得元素
没有返回值

首先 JavaScript 原始实现方式

```ts
const a = [1,3,5,7,88]
const x = 8
// b 代表 第一个大于x得数字
const b = a.find(a => a > x)

// b === undefined 代表所有元素都比8小

if (b === undefined) {
  a.push(x)
} else {
  const idx = a.indexOf(b)
  a.splice(idx, 0, x)
}

// 优化代码 我们直接 indexOf 获取 b 的位置
const a = [1,3,5,7,88]
const x = 8
// b 代表 第一个大于x得数字
const b = a.find(a => a > x)

const idx = a.indexOf(b)
a.splice(idx === -1 ? a.length : idx, 0 , x)
```

那我们如何使用程序来完成实现上述过程

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9e79db7c50e48f09d44cbb31090155c~tplv-k3u1fbpfcp-watermark.image?)

每次拿绿色的指针元素 跟 我们插入的元素进行比较 每次对比 都会向左递减方向
```ts

function insert(A, x) {
  // p 指向下一个需要比较的元素
  // p + 1 指向空位
  let p = A.length - 1;

  while(p >= 0 && A[p] > x) {
    A[p + 1] = A[p]
    p--
  }
  A[p + 1] = x
}
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f8e00e4aef846da8e517da4e29efbd8~tplv-k3u1fbpfcp-watermark.image?)


完整的插入排序

```ts
function insert(A, i,x) {
  let p = i - 1;
    while(p >= 0 && A[p] > x) {
    A[p + 1] = A[p]
    p--
  }
  A[p + 1] = x
}
function insertion_sort(A) {
  for(let i = 1; i < A.length; i++) {
    insert(A, i , A[i])
  }
}
```


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72f5984269dd4af29c75aece56d7b7d9~tplv-k3u1fbpfcp-watermark.image?)
