![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de113c8a88df4ab29b9039b8a6420b37~tplv-k3u1fbpfcp-watermark.image?)

# TypeScript 基础语法

## 基础类型 (转义默认 ES5)

```ts
// Boolean
let isFlag: boolean = false
// 转义之后
var flag = false

// Number
let counter: number = 1000
// 转义之后

var counter = 1000

// String
let name: string = 'erkelost'
// 转义
var name = 'erkelost'

// Array
let list: number[] = [1, 2, 3]
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]
// Array<number>泛型语法 Jsx不支持 会有冲突
// ES5：var list = [1,2,3];
```

## 给对象添加类型

### object 对象可以用于描述一个对象

```ts
const userInfo: object = {
  name: 'adny',
  age: '18'
}
```

:::tip
但是我们从 userInfo 中不能获取数据 也不能设置数据 因为 object 里面 根本就没有 age 和 name 属性
Object 是 Object 对象实例
:::

## 定义数组的其他类型

```ts
const name: string[] = []

const age: Array<string> = []

let pop: (string | number)[] = []
// 表示定义了一个名称叫做arr的数组,
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
pop = [1, 'b', 2, 'c']

interface arrType {
  name: string
  age: number
}
const adny: arrType[] = [{ name: adny, age: 99999 }]
```

## 枚举类型

:::warning
使用枚举我们可以定义一些带有命名的变量 我们可以清晰的表达我们对一组不同数组需要做的不同事情 Typescript 支持对基于字符串 和 数组 做枚举

:::

```ts
// 数字枚举
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST
}
// 转义
var Direction
;(function (Direction) {
  Direction[(Direction['NORTH'] = 3)] = 'NORTH'
  Direction[(Direction['SOUTH'] = 4)] = 'SOUTH'
  Direction[(Direction['EAST'] = 5)] = 'EAST'
  Direction[(Direction['WEST'] = 6)] = 'WEST'
})(Direction || (Direction = {}))

let dir: Direction = Direction.NORTH
export enum EnumThemeLayoutMode {
  'vertical' = '左侧菜单模式',
  'horizontal' = '顶部菜单模式',
  'vertical-mix' = '左侧菜单混合模式',
  'horizontal-mix' = '顶部菜单混合模式'
}

export enum EnumThemeTabMode {
  'chrome' = '谷歌风格',
  'button' = '按钮风格'
}
```

默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3

## Any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型（也被称作全局超级类型）。

```ts
let name: any = 666
name = 'erkelost'
name = false
```

## Unknown 类型

就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any） unknown 类型只能被赋值给 any 类型和 unknown 类型本身。 只有能够保存任意类型值的容器才能保存 unknown 类型的值

```ts
let name: unknown = 666
name = 'erkelost'
name = false
//error
let value3: boolean = name
// Error Type 'unknown' is not assignable to type 'boolean'.
let value4: number = name
// Error Type 'unknown' is not assignable to type 'number'.
```

:::warning 理解
unknown 用来描述类型的不确定性， 是 typescript 中一种比较特殊的类型，
它用于描述类型的不确定的变量 和 any 类型，有点类似， 但是如果使用了 unknown 类型的值做任何事情都是不合法的
:::

- 应用场景

```ts
function foo(): string {
  return 'foo'
}
function bar(): number {
  return 999
}

const flag = true
let result: unknown
if (flag) {
  result = foo()
} else {
  result = bar()
}

if (typeof result === 'string') {
  // 使用类型缩小来确定类型
}
```

## 元组 Tuple 类型

数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型

```ts
let tupleType: [string, boolean]
tupleType = ['erkelost', true]
```

那么数组和 tuple 有什么区别呢？

数组中通常建议存放相同类型的元素，不同类型的元素不推荐放到数组中

元组每个元素都有自己特性 根据索引是可以获取到对应值的类型

```ts
const info: (string | number)[] = ['erkelost', 999999, 'age']
const item = info[0]
// 这是数组，不能确定类型
const info: [string, number] = ['erkelost', 999999]
const item = info[1]
// 可以获取到number类型
```

tuple 元组的应用场景 react 的 useState
tuple 通常作为返回值使用

```ts
function useState<T>(state: T): [T, (newState: T) => void] {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  return [currentState, changeState]
}

const [counter, setCounter] = useState(200)
```

## Void 类型

void 类型与 Any 类型相反 它表示没有任何类型 当一个函数没有返回值时 我们通常会使用 Void

```ts
// 声明函数返回值为void
function warnUser(): void {
  console.log('This is my warning message')
}
```

:::warning

◼ 这里还有一个注意事项:
我们可以将 undefined 赋值给 void 类型，也就是函数可以返回 undefined
因为 undefined 就是没有返回值

声明一个 void 类型的变量没有什么作用，因为它的值只能为 undefined 或 null
:::

```ts
let unusable: void = undefined
```

## Null 和 Undefined 类型

#### 在 ts 中 undefined 和 null 两者有各自的类型 也是 undefined 和 null

```ts
let u: undefined = undefined
let n: null = null
```

## Never 类型

never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：

```ts
type Foo = string | number

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === 'string') {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === 'number') {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo
  }
}
```

never 表示永远不会发生的 类型，比如一个函数

如果一个函数是一个死循环或者抛出一个异常, 那么这个函数不回返回任何东西

不返回东西其实写任何类型都不合适这个时候我们可以使用 never 类型

```ts
function loop(): never {
  while (true) {
    //
  }
}
function Err(): never {
  throw new Error()
}
```

never 类型的应用场景

```ts
function handleMessage(message: string | number) {
  switch (typeof message) {
    case 'string':
      //
      break
    case 'number':
      //
      break
    default:
      const check: never = message
  }
}
```

## 类型断言 as

有时候 TypeScript 无法获取具体的类型信息，这个我们需要使用类型断言（Type Assertions）。你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构

:::warning
所谓断言就是断定、确定、绝对的意思；所以简单来讲，类型断言就是保证数据类型一定是所要求的类型
类型断言就是 我们可以 把 范围类型的变量 指定为一个更加具体的类型
:::

```ts
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

比如 我们现在使用通过 document.getElementById 来获取 id ts 只能知道我们现在需要返回 HTMLElement 但是他是不知道我们返回的具体类型

```ts
const myEl = document.getElementById('adny') as HTMLImageElement
myEl.src = 'PIC URL'
// 这种就能让我们知道 现在的 myEl 是 图片元素
```

## 非空类型断言！

当我们上下文的类型检查器 无法断定类型时 我们可以使用！后缀用于断言操作对象是非 null 或者 undefined 类型 意思就是我们可以从可能是未定义中排除 null 和 undefined

```ts
interface Entity {
  name: string
}
// 这是因为传入的e有可能是为undefined的，这个时候是不能执行方法的
function processEntity(e?: Entity) {
  let s = e.name // ERROR  这时候 ts 检查会 检查出我们类型可能是未定义
  let s = e！.name // ERROR
}

```

## 可选链的使用 ？.

ES11 新特性 他的作用是当对象属性不存在时 代码短路 返回 undefined 我们一般都会判断 不是 undefined 或者存在的 时候 才会执行代码

```ts
type Person = {
  name: string
  age?: number
  friends?: {
    name: string
    age?: number
    girlfriend?: {
      name: string
      age?: number
    }
  }
}
const info: Person = {
  name: 'adny',
  age: 18,
  friends: {
    name: 'adny',
    age: 18,
    girlfriend: {
      name: 'adny',
      age: 18
    }
  }
}
console.log(info.friend?.name)
console.log(info.friend?.age)
```

## ?? 和 ！！ 的作用

！！操作符 将一个其他类型转换成 boolean 类型

？？操作符 空值合并操作符 ？？ 是一个逻辑操作符 当操作符的左侧是 null 或者 undefined 的时候 返回右侧操作符 否则 则返回左侧操作符

## 类型缩小 （类型守卫）

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。目前主要有四种的方式来实现类型保护：

:::warning
常见的类型保护有以下几种

1. typeOf
2. instanceOf
3. in
4. 平等缩小 比如（ ===， ！== ）
   :::

## typeOf 关键字

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return '我是number类型'
  }
  if (typeof padding === 'string') {
    return '我是string类型'
  }
}
```

## In 关键字

javascript 中有一个运算符 用于确定对象是否具有带名称的属性 in 运算符 如果指定属性在指定得对象或其原型链中 则 in 返回 true

```ts
type Fish = { swim: () => void }
type Dog = { run: () => void }
function move(animal: Fish | Dog) {
  if ('swim' in animal) {
    animal.swim()
  } else {
    animal.run()
  }
}
```

```ts
interface Admin {
  name: string
  privileges: string[]
}

interface Employee {
  name: string
  startDate: Date
}

type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name)
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges)
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate)
  }
}
```

### 平等类型缩小

```ts
type Direction = 'left' | 'right' | 'center'
function turDirection(direction: Direction) {
  switch (direction) {
    case 'left':
      return 'left'
    case 'right':
      return 'right'
    case 'center':
      return 'center'
    default:
      return 'center'
  }
}
```

## 联合类型

TypeScript 的类型系统允许我们使用多种运算符
从现有类型中构建新类型。 我们来使用第一种组合类型的方法：联合类型（Union Type）

联合类型是由`两个`或者`多个`其他类型组成的类型；

表示可以`是这些类型中的任何一个值`;

联合类型中的每一个类型被称之为`联合成员（union's members）`;

```ts
function printId(id: string | number) {
  console.log('您的 id 是 ', id)
}
printId(10)
printId('erkelost')
```

如果我们在一个返回值中 想同时接收两种类型的值

```ts
// 定义联合类型数组
const arr: string[] = []
const arr: (string | number)[] = []
// 函数类型 联合类型通常与null 和 undefined 一起使用
const sayHello = (name: string | undefined) => {
  /* ... */
}
sayHello('erkelost')
sayHello(undefined)
// 其他用法
let num: 1 | 2 = 1
type EventNames = 'click' | 'scroll' | 'mousemove'
```

:::warning
这里 name 的类型是 string | undefined 意味着可以将 string 或 undefined 的值传递给 sayHello 函数。
:::

instanceof javascript 中 有一个运算符来检查一个值 是否 是 另一个值得实例

使用类型缩小配合联合类型使用 推断出更加具体的类型

```ts
function printValue(date: Date | string) {
  if (date instanceof Date) {
    console.log(date.toLocaleString())
  } else {
    console.log('date is not a date')
  }
}
```

## 可辨识联合类型 TypeScript 可辨识联合（Discriminated Unions）类型 包含三个要点 可辨识 联合类型 和 类型守卫

### 1. 可辨识

```ts
enum CarTransmission {
  Automatic = 200,
  Manual = 300
}

interface Motorcycle {
  vType: 'motorcycle' // discriminant
  make: number // year
}

interface Car {
  vType: 'car' // discriminant
  transmission: CarTransmission
}

interface Truck {
  vType: 'truck' // discriminant
  capacity: number // in tons
}
```

:::warning
上述代码 我们定义三个接口 每个接口都包含一个 type 属性 这中属性被称为可辨识 属性 其他的属性 只跟不同接口的特性有关
:::

### 2.联合类型

### 基于前面定义的三个接口 我们可以创建一个 Vehicle 联合类型

```ts
type Vehicle = Motorcycle | Car | Truck
```

### 3.类型守卫

```ts
function evaluatePrice(vehicle: Vehicle) {
  switch (vehicle.vType) {
    case 'car':
      return vehicle.transmission * EVALUATION_FACTOR
    case 'truck':
      return vehicle.capacity * EVALUATION_FACTOR
    case 'motorcycle':
      return vehicle.make * EVALUATION_FACTOR
  }
}
```

## 类型别名

类型别名用来给一个类型起一个新名字 使用 type 来起名

```ts
type message = string | number[]

let adny = (message: message) => {}

type ID = string | number
function printId(id: ID) {
  // id
}
```

## 接口的声明

原来通过 type 来声明一个对象类型 对象的另外一种声明方式就是通过接口来声明

```ts
type Point = {
  x: number
  y: number
}

interface Point {
  x: number
  y: number
}
```

## interface 和 type 的区别 ✨✨✨

相同点

都可以描述一个对象或者函数

```ts
interface User {
  name: string
  age: number
}
interface SetUser {
  (name: string, age: number): void
}

type User = {
  name: string
  age: number
}

type SetUser = (name: string, age: number) => void
```

都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

```ts
// interface extends interface
interface Name {
  name: string
}
interface User extends Name {
  age: number
}
// type extends type
type Name = {
  name: string
}
type User = Name & { age: number }

// interface extends type
type Name = {
  name: string
}
interface User extends Name {
  age: number
}

// type extends interface
interface Name {
  name: string
}
type User = Name & {
  age: number
}
```

不同点

type 可以声明基本类型别名 联合类型 元组等类型

type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div')
type B = typeof div

type StringOrNumber = string | number
type Text = string | { text: string }
type NameLookup = Dictionary<string, Person>
type Callback<T> = (data: T) => void
type Pair<T> = [T, T]
type Coordinates = Pair<number>
type Tree<T> = T | { left: Tree<T>; right: Tree<T> }
```

interface 能够声明合并

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string
}
*/
```

:::warning 区别
interface 和 type 都可以用来定义对象

如果定义非对象类型 那么建议使用 type 来定义

如果定义对象类型

interface 可以重复定义某个接口的属性和方法

type 是类型别名 名字是不可以重复的
:::

## 交叉类型

在 ts 中交叉类型是将多个类型合并成一种类型 通过 & 将现有的多种类型叠加到一起成为一种类型

```ts
type name = { name: string }
type erkelost = { age: number } & name
let adny: erkelost = {
  age: 99,
  name: 'erklost'
}
```

## 可选类型补充

事实上 我们可以把可选类型当成是 类型 和 undefined 的 联合类型

```ts
function print(message?: string) {
  console.log(message)
}

print()
print('erkelost')
print(undefined)

print(null)
// argument of type 'null' is not assignable to parameter of type
```

## 类型别名

在前面，我们通过在类型注解中编写 对象类型 和 联合类型，但是当我们想要多次在其他地方使用时，就要编写多次。比如我们可以给对象类型起一个别名：

```ts
type point = {
  x: number
  y: number
}
function printPoint(point: Point) {
  console.log(point.x, point.y)
}
type ID = number | string

function printId(id: ID) {
  return id
}
```

## 函数

函数是 javascript 中非常重要的组成部分 typescript 允许我们指定函数的参数和返回值的类型

函数的参数的类型注解 在声明函数的时候 我们可以在每个参数后面添加类型注解 生命函数接收的参数类型

```ts
function greet(name: string) {
  return 'Hello ' + name.toUpperCase()
}
greet(123)
// argument of type 'number' is
// not assignable to parameter of type 'string'

greet('erkelost', 'adny')
// expected 1-2 arguments, but got 2
```

我们也可以添加返回值的类型注解，这个注解出现在函数列表的后面

如果我们希望限定的一个函数接受的参数是一个对象 那么我们需要如何限定呢 我们可以使用对象类型

```ts
function printCoordinate(point: { x: number; y: number }) {
  console.log(point.x * point.y)
}
interface pointInterface {
  x: number
  y: number
}
type pointType = {
  x: number
  y: number
}
function printCoordinateT(point: pointType) {
  console.log(point.x * point.y)
}

function printCoordinateI(point: pointInterface) {
  console.log(point.x * point.y)
}
```

可选类型 我们也可以指定那些属性是可选的 这个 interface 和 type 同上 就不写了

```ts
function printCoordinate(point: { x: string; y: string; z?: number }) {
  if (point.z) {
    console.log(x, y, z)
  }
}
```

:::warning
在对象我们可以添加属性，并且告知 TypeScript 该属性需要是什么类型；
属性之间可以使用 , 或者 ; 来分割，最后一个分隔符是可选的；
每个属性的类型部分也是可选的，如果不指定，那么就是 any 类型；
:::

typescript 对函数有严格的校验 比如返回值类型 参数包含必填和可选参数 函数重载

````ts
// 基本函数类型
function createUserId(name: string, id: number): string {
  return name + id
}

// 可选参数以及默认参数
// 可选参数
function createUserId(name: string, id: number, age?: number): string {
  return name + id
}

// 默认参数  注意 可选参数需要放在arguments最后面  我们后面会讲到 泛型
//  string 返回值类型略过
function createUserId(name: string = 'erkelost', id: number, age?: number){
  return name + id
}

// 剩余参数 es6起 js支持剩余参数 成语参数语法允许我们将一个不定数量的参数放到一个数组中
function sum(...sums: number[] {
  let total = 0
  for (const num of nums) {
    total += num
  }
  return total
})
## 函数类型调用签名

```ts
const bar : IBar = (num1: number): number => {
  return 123
}
bar()
````

使用函数类型表达式

```ts
type IBar = (num: number) => number
```

使用函数的调用签名 从对象的角度来看待这个函数

```ts
interface IBar {
  name: string
  (num: number) => number
}
```

// 函数重载 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string
function add(a: Combinable, b: Combinable) {
// type Combinable = string | number;
if (typeof a === 'string' || typeof b === 'string') {
return a.toString() + b.toString()
}
return a + b
}

````

## 可选 和 只读 属性

(只读属性用于限制只能在对象刚刚创建的时候修改其值)

```ts
interface Person {
  readonly name: string;
  age?: number;
}
````

## 任意属性

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

const p1 = { name: 'adny' }
const p2 = { name: 'erkelost', age: 5 }
const p3 = { name: 'obj', sex: 1 }
```

## this

可推导的 this 类型

this 在不同情况下会绑定不同的值 所以 他的类型情况比较复杂 那么在 ts 中 如何处理 this 的呢

```ts
const info = {
  name: 'erkelost',
  say: function () {
    console.log(this.name)
  }
}
info.say() // 这里是确定的this指向  直接在对象中 我们 funciton this指向上一层的对象
```

不确定的 this 类型

但是对于某些情况来说， 我们并不知道 this 指向的到底是什么

```ts
function sayHello() {
  console.log(this.name)
}
const info = {
  name: 'erkelost',
  sayHello
}
```

:::warning
这里运行代码会报错 ts 进行类型监测的目的是为了让我们的代码更加安全
所以这里对于 sayhello 来说 我们虽然是在 info 中放入了 sayhello 但是我们并不知道 this 指向的是什么
这个函数也可以去自己调用 这种代码是非常不安全的 或者通过别的对象去调用这个函数 这时候 this 的
指向就会发生变化
:::

### 指定 this 类型

这个时候 ts 通常会要求我们明确的指定 this 的类型

```ts
type NameType = {
  name: string
}
function sayHello(this: NameType) {
  console.log(this.name)
}
```

## this 的内置工具的使用

typescript 提供了一种我们可以使用 this 的类型工具

```ts
function foo(this: { name: string }, info: { name: string }) {}
type FooType = typeof foo

// 获取foo 函数中的 this 类型 可以提取 this 的类型
type FooThisType = ThisParameterType<FooType>
```

omit this 的类型

```ts
type PureFooType = OmitThisParameter<FooType>
```

给对象绑定 this 类型
