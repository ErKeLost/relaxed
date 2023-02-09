# 冒泡排序

### 什么是冒泡排序

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0eff8aa3ae4c4a858fb4f05ee708be69~tplv-k3u1fbpfcp-watermark.image?)


一次比较两个元素 发现每个元素之间比较大小 进行交换


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf533e6283824aa98066c081cf5da36b~tplv-k3u1fbpfcp-watermark.image?)


冒泡排序 bubble sort 也称作为下沉排序 sinking sort 他重复比较
相邻得两个元素 知道整个数组都没有数字可以在进行交换


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5727886d81154c6182698050f4432883~tplv-k3u1fbpfcp-watermark.image?)


### 抽象



外层循环不变式

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb88b1760c7e4766aa42c09177ed9d31~tplv-k3u1fbpfcp-watermark.image?)

内层循环不变式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47927534d9324cecbf9bcd0a078f020e~tplv-k3u1fbpfcp-watermark.image?)


```ts
function swap(A, i, j) {
  const t = A[i]
  A[i] = A[j]
  A[j] = t
}

function bubble_sort(A) {
  for (let i = A.length - 1; i >= 1; i--) {
    for (let j = 1; j <= i; j++) {
      A[J - 1] > A[j] && swap(A, j - 1 , j)
      // 循环结束 j 指向 A[0] - A[j] 中的最大值
    }
    // 循环结束 A[i] - A[n - 1] 已排序
  }
}


const A = [5,621,1,2,3,4,5,2,1,1,55]
bubble_sort(A )
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74ac90e7a41844ecbae50c0d287c4709~tplv-k3u1fbpfcp-watermark.image?)
