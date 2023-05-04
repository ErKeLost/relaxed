# 栈结构

#### 线性结构

线性结构是由 n 个数据元素组成的有限序列，数据元素之间是一对一的关系。

:::warning
数组结构是一种线性结构, 链表是一种线性结构，栈结构是一种受限的线性结构，队列结构是一种受限的线性结构
:::

#### 数组结构

数组结构是一种重要的数据结构，它用一组连续的存储单元来存储一组具有相同类型的数据。通常数组的内存是连续的，所以数组支持随机访问，但是数组的长度是固定的，所以数组的插入和删除操作比较低效。所以一般高性能插入都会用链表，比如 React 中的部分实现


:::warning
借助数组结构实现其他的数组结构 比如 栈 队列 堆结构
:::


#### 栈结构

栈结构是一种受限的线性结构，它只允许在一端插入和删除数据。栈结构是一种后进先出的数据结构，也就是说最后插入的数据会被最先删除，最先插入的数据会被最后删除。栈结构的典型应用是函数调用栈，当一个函数调用另一个函数时，会将当前函数的上下文压入栈中，当被调用的函数执行完毕后，会将当前函数的上下文从栈中弹出。

数组是一种线性结构，并且可以在数组的`任意位置` 插入和删除数据, 但是有些时候我们必须要限制这种功能，比如栈结构，栈结构只允许在一端插入和删除数据，这样就可以保证栈结构的数据是后进先出的。栈和队列就是比较常见的受限的线性结构。


:::tip 鄙视题
6,5,4,3,2,1 从栈顶到栈底依次入栈，那么出栈的顺序是什么？
:::


#### 栈结构的实践

栈结构的实现有两种方式，一种是基于数组实现，一种是基于链表实现。基于数组实现的栈结构叫做顺序栈，基于链表实现的栈结构叫做链式栈。

数组实现
```ts
class ArrayStack<T> {
    private data: T[] = []

    push(el: T) {
        this.data.push(el)
    }

    pop(): T | undefined {
        if (this.data.length !== 0) {
            return this.data.pop()
        }
    }

    peek(): T | undefined {
        if (this.data.length !== 0) {
            return this.data[this.data.length - 1]
        }
    }

    isEmpty():T {
        return this.data.length === 0
    }

    size():T {
        return this.data.length
    }
}
```

:::warning
封装接口 为了以后可能使用链表结构
:::

```ts
interface IStack<T> {
    push(el: T): void
    pop(): T | undefined
    peek(): T | undefined
    isEmpty(): boolean
    size(): number
}

class ArrayStack<T> implements IStack<T> {
    private data: T[] = []

    push(el: T) {
        this.data.push(el)
    }

    pop(): T | undefined {
        if (this.data.length !== 0) {
            return this.data.pop()
        }
    }

    peek(): T | undefined {
        if (this.data.length !== 0) {
            return this.data[this.data.length - 1]
        }
    }

    isEmpty(): boolean {
        return this.data.length === 0
    }

    size(): number {
        return this.data.length
    }
}
```


:::tip
十进制转二进制面试题
:::

```ts
function decimalToBinary(decNumber: number): string {
    const stack = new ArrayStack<number>()
    let binary = ""
    while(decNumber !== 0) {
        stack.push(decNumber % 2)
        decNumber = Math.floor(decNumber / 2)
    }

    while(!stack.isEmpty()) {
        binary += stack.pop()
    }
    return binary
}
```

:::tip
判断有效的括号 相同类型的括号要一一对应
:::

```ts
function isValid(s: string): boolean {
    const stack = new ArrayStack<string>()
    for (let i =0; i < s.length; i++) {
        switch s[i] {
            case "(":
                stack.push(")")
                break
            case "[":
                stack.push("]")
                break
            case "{":
                stack.push("}")
                break
            default:
                if (stack.isEmpty() || stack.pop() !== s[i]) {
                    return false
                }
        }
    }
    return stack.isEmpty()
}
```

