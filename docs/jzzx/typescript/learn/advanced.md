![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de113c8a88df4ab29b9039b8a6420b37~tplv-k3u1fbpfcp-watermark.image?)

# TypeScript 高级语法

## 枚举类型

枚举类型是一组可能出现的值列举出来 定义在一个类型中 这个类型就是枚举类型

枚举允许开发者定义一组命名常量 常量可以是数字也可以是字符串类型

```ts
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
const dl: Direction = Direction.UP

function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.LEFT:
      console.log('')
      break
  }
}
```

枚举类型设置值

```ts
enum Direction {
  LEFT = 'LEFT'
  RIGHT = "RIGHT"
}
```

:::warning 枚举类型默认值
枚举类型默认值从 0 开始 可以重新赋值  
:::

## 泛型

泛型表示泛指某一种类型 开发者可以指定一个表示类型的变量 用来作为实际类型的占位符 用尖括号来包裹这个类型变量 泛型的作用主要是创建可以重用的组件 从而让一个组件可以支持多种数据类型 它也可以作用在接口 类 函数 或者函数别名上

首先我们定义一个函数 让一个函数接受一个参数并直接返回这个参数

```ts
function identity(value) {
  return value
}
console.log(identity(111)) // 111
```

然后我们在继续支持 typescript 类型的参数

```ts
function identity(value: number): number {
  return value
}
console.log(identity(666))
```

这里我们将 number 类型分配给参数和返回类型 使得该函数可用于原始类型 但是该函数不是通用的 我们希望定义不同的类型 但是还不能使用 any 因为 any 会使得编译器失去类型保护的作用 我们目的是让 函数适合任意的类型 我们可以使用泛型

```ts
function identity<T>(value: T): T {
  return value
}
console.log(identity<number>(1)) // 1
```

当我们调用函数的时候 number 类型 就像 参数 一样 会出现在 T 的任何位置进行填充 T 被称为类型变量 其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

到底要传入什么类型，不能写死，要让用户自己传递上去,让用户传递一个类型，用户传递类型在函数名字得后面

```ts
function identity<Type>(arg: Type): Type {
  return arg
}

const res1 = identity<number>(123)

const res2 = identity<string>('string')

const res3 = identity<{ name: string }>({ name: 'ek' })
```

:::warning
T (type) 表示类型
K (Key) 表示对象中的键的类型
V (Value) 表示对象中值的类型
E (Element) 表示元素类型
:::

而且 我们并不是只能定义一个类型变量 我们 可以引用定义希望的任何数量的类型变量 比如我们引用了一个类型变量 u 用于扩展我们定义的函数

```ts
function identity <T U>(value: T, message: U): T {
  console.log(message)
  return value
}
console.log(identity<Number, string>(68, "erkelost"));
```

我们返回多种类型 可以使用元组

```ts
function identity<T, U>(value: T, message: U): [T, U] {
  return [value, message]
}
```

:::warning useState 的练习 react

```ts

```

:::

### 泛型接口

解决函数中返回多种类型对象的问题 我们可以创建一个用于 identity 函数通用接口

```ts
interface Identities<V M> {
  value: V
  message:
}
```

```ts
function identity<T, U>(value: T, message: U): Identities<T, U> {
  console.log(value + ': ' + typeof value)
  console.log(message + ': ' + typeof message)
  let identities: Identities<T, U> = {
    value,
    message
  }
  return identities
}

console.log(identity(68, 'Semlinker'))
```

### 泛型约束

我们可以限制类型变量对应类型上的某些属性

确保属性是否存在

```ts
function identity<T>(arg: T): T {
  // Property 'length' does not exist on type 'T'.(2339)
  console.log(arg.length) // Error
  return arg
}
```

编译器没法确认 T 类型一定含有 length 属性，尤其是在可以将任何类型赋给类型变量 T 的情况下。需要做的就是让类型变量 extends 一个含有我们所需属性的接口 这时候会报错

```ts
interface Length {
  length: number
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length) // 可以获取length属性
  return arg
}
```

这时候 如果在调用这个函数 但是传递别的类型的值 就会报错 使用 ，逗号来分割多中的约束类型 T extends Length, Type2, Type3>

```ts
// 使用其他数组也可以调用length
function identity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```

## Extend

接口和类型别名都能够被扩展，但语法有所不同。此外，接口和类型别名不是互斥的。接口可以扩展类型别名，而反过来是不行的。

继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

```ts
// 接口继承接口
interface Person {
  name: string
  age?: number
}
interface obj extends Person {
  sex: number
}

// 类型别名 继承

type PartialPointX = { x: number }
type Point = PartialPointX & { y: number }
```

## Implements

implements 实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

```ts
interface Point {
  x: number
  y: number
}

class SomePoint implements Point {
  x = 1
  y = 2
}

type Point2 = {
  x: number
  y: number
}

class SomePoint2 implements Point2 {
  x = 1
  y = 2
}
```

## Ts 映射类型 工具链

我们设定如果登录 需要 以下类型

```ts
type user {
  username: string
  password: string
}
```

如果我们修改对象信息 只能修改密码 那么我们不需要 username 我们需要定义可选类型

```ts
type UserPartial {
  username?: string
  password?: string
}
```

对于查看用户信息 所有都是只读属性

```ts
type ReadonlyType {
  readonly username?: string
  readonly password?: string
}
```

这样代码就会有许多相同的 字段 我们这时候可以是用映射类型 他是一种泛型 Mapped Type 把原有的对象类型映射成为新的对象类型

## 映射类型语法

```ts
{[P in K]: T}
// in 类似js中的 for in 语句 用于遍历k类型中的所有类型
// T 类型用于 表示ts中的任意类型
// 在映射的过程中我们还可以使用 readonly 和 ？ 这两个额外的修饰符

// 映射类型 示例
type Item = { a: string; b: number; c: boolean }
type T1 = { [P in "X" | "Y"]:number}
// { x:number, y: number}
type T2 = { [P in "x" | "y"]: p}
// { x: 'x', y: 'y'}
type T3 = { [P in "a" | "b"] : Item[p]}
// { a: string, b: number}
type T4 = { [P in keyof Item]: item[P]}
// { a: string, b:number, c: boolean}
```
