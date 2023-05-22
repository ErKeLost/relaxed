# 链表结构

### 非常非常重要的结构

:::tip 什么是链表结构
链表是一种数据结构，由一组节点组成，每个节点包含数据和指向下一个节点的指针。链表可以用来存储任意数量的数据，每个节点可以随时添加或删除。与数组不同，链表中的元素不必按顺序存储，因此可以更灵活地管理数据。链表在许多计算机算法和编程语言中都得到广泛应用。
:::

- 数组

  - 优点：可以随机访问任何位置的元素
  - 缺点：在数组的开头或中间插入或删除元素很慢，因为需要移动元素

- 链表

  - 优点：在链表的开头或中间插入或删除元素很快，因为不需要移动元素
  - 缺点：不能随机访问元素，必须从开头开始迭代列表直到找到所需的元素


### 实现一个链表


封装两个类

- Node类：表示节点
- LinkedList类：提供插入节点、删除节点、显示列表元素的方法

:::tip
链表中的常见操作
- append(element)：向列表尾部添加一个新的项
- insert(position, element)：向列表的特定位置插入一个新的项
- get(position)：获取对应位置的元素
- indexOf(element)：返回元素在列表中的索引。如果列表中没有该元素则返回-1
- update(position, element)：修改某个位置的元素
- removeAt(position)：从列表的特定位置移除一项
- remove(element)：从列表中移除一项
- isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false
- size()：返回链表包含的元素个数
- toString()：由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
- print()：打印链表
- getHead()：获取链表的头部
- getTail()：获取链表的尾部
:::


```js
// Node类
class Node<T> {
  public value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
```

```js
// LinkedList类
class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  append(value: T) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  traverse(callback: (node: Node<T>) => void) {
    let current = this.head;
    while (current) {
      callback(current);
      current = current.next;
    }
  }

  insert(position: number, value: T) {
    if (position < 0 || position > this.size) {
      return false
    }
    // 双指针做法
    const node = new Node(value);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      node.next = current;
      previous.next = node;
    }
    this.size++;
    return true;
  }

  remove(value: T) {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  removeAt(position: number) {
    if (position < 0 || position >= this.size) {
      return null;
    }
    let current = this.head;
    if (position === 0) {
      this.head = this.head.next;
    } else {
      let previous = null;
      let index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous!.next = current?.next ?? null;
    }
    this.size--;
    // value :: undefined
    return current.value ?? null;
  }

  update(position: number, value: T) {
    if (position < 0 || position >= this.size) {
      return false;
    }
    let current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current!.next;
    }
    current!.value = value;
    return true;
  }

  indexOf(value: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  isEmpty() {
    return this.size === 0;
  }


  get(position: number): T | null {
    if (position < 0 || position >= this.size) {
      return null;
    }
    let current = this.head;
    let index = 0;
    while (index++ < position) {
      current = current!.next;
    }
    return current!.value;
  }

  get length() {
    return this.size
  }
}
```

```ts
const link = new LinkedList<number>();
link.append(1);
link.append(2);
link.traverse((node) => {
  console.log(node.value);
});
```
## 删除 node 节点

```ts
// 删除节点
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode |null) {
    this.val = val
    this.next = next
  }
}

function deleteNode(node: ListNode | null): void {
  node!.val = node!.next.val
  node.next = node.next.next
}
```

## 反转列表

### 栈结构方式 入栈出栈

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode |null) {
    this.val = val
    this.next = next
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null
  if (!head.next) return head

  // 使用栈结构
  const stack: ListNode[] = []
  let current: ListNode | null = head
  while(current) {
    stack.push(current)
    current = current.next
  }

  // 从栈中取出元素 重新组成链表 返回 head 节点
  const newHead = ListNode | null = stack.pop()
  let newHeadCurrent = newHead
  while(stack.length) {
    newHeadCurrent.next = stack.pop()
    newHeadCurrent = newHeadCurrent.next
  }
  newHeadCurrent.next = null
  return newHead
}
```

### 非递归的方式

```ts
function reverseList(head: ListNode | null): ListNode | null {
  // 判断节点为空或者只有一个节点 直接返回 head
  if (!head || !head.next) return null

  // 反转列表
  let newHead: ListNode | null = null

  // 第一步 让一个 current 节点指向 head 的下一个节点 目的是保留着下一个节点的引用 防止被销毁

  // 第二部 改变head 当前指向的节点的指向 让其指向 newHead 对于第一个节点来说 指向 newHead 就是 null

  // 第三步 让 newHead 指向 head 目的是下一次遍历时 第二部操作可以让下一个节点 指向 第一个节点

  // 第四步 让 head 指向 current 目的是下一次遍历时 第二部操作可以让下一个节点 指向 第一个节点

  while(head) {
    let current = head.next

    head.next = newHead

    newHead = head

    head = current
  }

  return newHead

}

```

:::tip
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afa7c3bd1de44497bd7c483eb8450a05~tplv-k3u1fbpfcp-watermark.image?)
:::



## 非递归的方式
