![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de113c8a88df4ab29b9039b8a6420b37~tplv-k3u1fbpfcp-watermark.image?)

## 认识类的使用

```ts
class Person {
  constructor(name: string) {
    this.name = name
  }
}

const p1 = new Person()
const p2 = new Person()
```

如果你的类中有成员变量， 必须要在类里面进行声明成员属性

```ts
class Person {
  name: string
  age: number
  // 初始化不为空 可以不 constructor
  name!: string
  age!: number
  // ||
  name = ''
  age = 0
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

const p1 = new Person()
const p2 = new Person()
```

## 类的成员修饰符

:::warning 修饰符
public 修饰符 任何地方可见 默认属性就是 public
private 私有属性 方法 只有在类的内部才可以访问
protected 修饰符仅在类自身及子类中可见 受保护的属性和方法
:::

```ts
class Person {
  public name: string
  protected age: number
  constructor(name: string, age: number) {
    this.name = name
    this.number = number
  }

  private eating() {}
}

class Student extends Person {
  constructor(name: string, number: number) {
    super(name, number)
  }
  study() {
    console.log(this.age)
  }
}
```

## readonly

```ts
class Person {
  readonly name: string

  constructor(name: string) {
    ...
  }
}

const p = new Person('erer')
p.name = 'adny' // error readonly 不可写
```

## getter 和 setter

正常情况下，如果我们定义了 private 私有属性外界是不可以访问这个变量的，但是如果在某些特殊情况我们想要去访问 private 私有变量 那么我们可以使用 setter 和 getter

```ts
class Person {
  private _name: string
  constructor(name: string) {
    this._name = name
  }
  set name(newValue: string) {
    this._name = newValue
  }
  get name(): string {
    return this._name
  }
}

const p = new Person('adny')
```

我们可以对值进行拦截 类似 proxy 和 defineProperty

## 类的参数属性使用

正常我们定义一个普通的类的参数 我们首先需要声明成员变量 然后给 this 赋值

```ts
class Person {
  name: string
  age: number
  height: number
  constructor(name: string, age: number, height: number) {
    this.name = name
    this.age = age
    this.height = height
  }
}

class Person {
  constructor(public name: string, public age: number, public height: number)
}
```

两段代码 一个意思 语法糖

## 抽象类

我们知道 继承是多态使用的前提

在定义许多通用的调用接口时，我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式

## 抽象类

如果需要计算不同类的情况下

```ts
class Rectangle {
  constructor(public width: number, public height: number) {}
}
class Circle {
  constructor(public radius: number) {}
}
function calcArea(shape: Circle | Rectangle) {}
```

这种情况下 如果又需要添加一个类 我们又需要在 `calcArea` 中 继续添加类型，那么可以使用继承的方法

```ts
abstract class Shape {
  abstract getArea()
}

class Rectangle extends Shape {
  ...
}

class Circle extends Shape {

}

function calcArea(shape: Shape) {}

```

在 shape 中定义方法，不定义实现体 这样我们就可以使用 shape 中的 getArea
面向对象的过程 抽象类不能实例化

## 鸭子类型

在 typescript 中只要有行为 就算类型匹配成功

typescript 在对于类型检测的时候使用鸭子类型

::: warning 鸭子类型
如果一只鸟，走起路来像鸭子，游起来像鸭子，看起来像鸭子，那么可以认为他就是一只鸭子

鸭子类型：只关心属性和行为，不关心具体是不是对应的类型
:::

```ts
class Person {
  constructor(public name: string)
}

class Dog {
  constructor(public name: string)
}

function print(p: Person) {}

print(new Dog('erkelost'))
```

## 类具有的类型特性

::: warning
类的作用
类可以创建对应的实例对象
类本身可以作为这个实例的类型
类也可以当成一个有构造签名的函数
:::

```ts
const name: string = 'aaa'

const p: Person = new Person()

// 可以直接传递一个类

function factory(ctor: new () => void) {}
```

## 接口的类实现过程

定义接口，我们一般都是作为类型使用的，但是在类中，提供了另外的一种功能

```ts
interface IKun {
  name: string
  age: number
  play: () => void
}

const play: IKun = {
  name: 'erkelost',
  age: 9999,
  play() {}
}

// 这是正常定义接口

// 在类中定义接口

class Person implements IKun {
  constructor(public name: string, public age: number) {}
  play() {}
}

const a = new Person()
console.log(a.name)
console.log(a.age)
```
