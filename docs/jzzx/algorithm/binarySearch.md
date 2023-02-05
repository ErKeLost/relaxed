# 二分查找法

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbde58dd0ff840a3aff07d5374f35371~tplv-k3u1fbpfcp-watermark.image?)

按拼音排序的试卷 如何找到嬴政的试卷 我们可以先从最中间获取 然后根据 拼音首字母继续查找 每次 都获取新一轮数据的中间的值 然后我们最后就可以获取到 嬴政了


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bceffd2b6fab411ba75dcdfea50e0fe9~tplv-k3u1fbpfcp-watermark.image?)

查找1000张试卷 最坏的规模需要查找多少次

最快的查找就一次 最坏的 是 最后才找到


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d12c09d96e3463b800c349b9cb6c575~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/460051e125ba401ea9dcf3bde90fe5f6~tplv-k3u1fbpfcp-watermark.image?)

论证猜想 就是我们获取一个数字 那么这个数除以多少次到一


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b473f31d52dc41c5b0968969978009f2~tplv-k3u1fbpfcp-watermark.image?)

一共是 k + 1 项 就是 k + 1 查找


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4280e3c4fb7b4b94834913c9a5e01c08~tplv-k3u1fbpfcp-watermark.image?)


最终
```ts
  T(n) = [log2n] + 1 // 成立
```


如果 遍历 一千个学生 遍历需要多少次 每个人都查找一遍 我们就需要 一千次 但是如果我们使用二分查找法 那么我们只需要 100 次 速度提升了一百倍


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df23fd8bdcbb4519a88213a3a22b0f4e~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f03a88fcdee047b5bfa0e26ce9a3a3a5~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/771b5232d5624fe5862abcf2624b862e~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05edf13249924ea097c6df6f7a39edd7~tplv-k3u1fbpfcp-watermark.image?)

g 等于 每次上一次 查找的 l + r 除以 2 向下取整

把 二分查找 抽象成一个 数组
进行抽象 返回 num 再 a 中的位置 不存在返回 -1
```ts
function binarySearch (arr, num) {
  let l = 0; // 查询范围左边界
  let r = arr.length - 1 // 查找范围最终边界 有边界
  let guess // 默认为空

  // while 语句可以在某个条件表达式为真的前提下，
  // 循环执行指定的一段代码，直到那个表达式不为真时结束循环。

  while (l <= r) {
    guess = Math.floor((l + r) / 2)
    // 获取循环不变时
    // guess 等于l，r 中间位置

    if (arr[guess] === num) return guess
    else if (arr[guess] > num) r = guess - 1
    else l = guess + 1
    // 新的循环不变式
  }
  return -1
}

```
