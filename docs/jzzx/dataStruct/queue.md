# 队列结构

队列结构也是一种受限的结构，队列是一种数据结构，它类似于现实生活中的排队等待的情景。队列是一种先进先出（FIFO）的数据结构，它的操作包括在队列的后端添加元素，和从队列的前端移除元素。队列通常用于处理一系列按照时间顺序排列的事件。例如，打印机的任务队列，银行柜员窗口的客户排队队列等。


### 实现队列结构

和栈结构一样可以
1. 用数组实现
2. 用链表实现

用数组实现会很浪费性能

```ts
interface IQueue<T> {
  enqueue(el: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  isEmpty(): boolean
  get size(): number
}

class Queue<T> implements IQueue<T> {
  private data: T[] = []
  enqueue(el: T) {
    this.data.push(el)
  }
  dequeue(): T | undefined {
    if (this.data.length !== 0) {
      return this.data.shift()
    }
  }
  peek(): T | undefined {
    if (this.data.length !== 0) {
      return this.data[0]
    }
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
  get size(): number {
    return this.data.length
  }
}

console.log(new Queue().size)
```


### 击鼓传花

击鼓传花算法
:::tip
hotPotato 函数接受两个参数，一个是包含所有玩家姓名的数组和一个表示淘汰数字的数字。函数会返回一个胜利者的姓名。
:::


```ts
function hotPotato(names: string[], num: number) {
  const queue = new Queue<string>()
  // 创建队列
  names.forEach((name) => {
    queue.enqueue(name)
  })
  while (queue.size > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()!)
    }
    queue.dequeue()
  }
  return queue.dequeue()
}


const name = hotPotato(["John", "Jack", "Camila", "Ingrid", "Carl"], 3)
```


### 约瑟夫环

什么是约瑟夫环?

```ts
function lastLive(n, m) {
  const queue = new Queue<number>()
  for (let i = 0; i < n; i++) {
    queue.enqueue(i)
  }
  while (queue.size > 1) {
    for (let i = 0; i < m - 1; i++) {
      queue.enqueue(queue.dequeue()!)
    }
    queue.dequeue()
  }
  return queue.dequeue()
}
lastLive(10, 3)
```
