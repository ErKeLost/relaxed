# IOC 解决了什么问题

在后台系统中, 会有许多对象。

- controller 对象 用于接收请求, 并调用 service 对象处理请求
- service 对象 用于处理业务逻辑, 并调用 dao 对象处理数据
- dao 对象 用于处理数据, 并调用数据库操作
- repository 对象 用于操作数据库

此外, 还有许多其他对象, 比如工具类, 配置类, 等等。 DataSource Configuration, Redis Configuration, Swagger Configuration, 等等。

这就导致了一个问题, 对象之间的依赖关系如何管理?

如果使用传统的方式, 比如在 controller 中, 通过 new 的方式创建 service 对象, 再通过 new 的方式创建 dao 对象, 再通过 new 的方式创建 repository 对象, 这样的话, 会导致对象之间的耦合度非常高, 一旦某个对象发生了变化, 就会导致其他对象也需要发生变化, 这样的话, 代码的维护性非常差。
这就导致了创建这些对象是很复杂的，你要理清它们之间的依赖关系，哪个先创建哪个后创建，哪个对象需要注入到哪个对象中，这些都是需要考虑的问题。

比如

```ts
const config = new Config({ username: 'xxx', password: 'xxx' })

const dataSource = new DataSource(config)

const repository = new Repository(dataSource)

const service = new Service(repository)

const controller = new Controller(service)
```

要经过一系列的步骤, 才能创建出 controller 对象。

如果使用 IOC 的方式, 就可以很好的解决这个问题。

## 什么是 IOC

IOC 全称 Inversion of Control, 即控制反转。

控制反转是一种设计思想, 用于解耦对象之间的依赖关系。

在传统的方式中, 对象之间的依赖关系是在对象内部创建的, 而在 IOC 的方式中, 对象之间的依赖关系是在外部创建的。

比如上面的例子, 在传统的方式中, controller 对象内部创建了 service 对象, service 对象内部创建了 dao 对象, dao 对象内部创建了 repository 对象, 这样的话, 对象之间的依赖关系就是在对象内部创建的。

而在 IOC 的方式中, 对象之间的依赖关系是在外部创建的, 比如在 controller 对象外部创建了 service 对象, 在 service 对象外部创建了 dao 对象, 在 dao 对象外部创建了 repository 对象, 这样的话, 对象之间的依赖关系就是在外部创建的。

这样的话, 对象之间的依赖关系就不会写死在对象内部, 而是在外部创建, 这样的话, 对象之间的耦合度就会降低, 对象之间的依赖关系也会更加灵活。
