# Aop 架构的好处

Mvc 是一种架构模式，Aop 是一种编程范式，两者并不冲突，可以同时使用。

Mvc 是 Model View Controller 的缩写，即模型-视图-控制器。 Mvc 架构下，系统被分为三层，分别是模型层、视图层、控制器层。请求会先到达控制器层，控制器层会调用模型层处理业务逻辑，再调用视图层渲染页面，最后返回响应。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0df3f35a96ba45279c737f1eb6061b11~tplv-k3u1fbpfcp-watermark.image?)

在这个流程中，Nest 还提供了 AOP （Aspect Oriented Programming）的能力，也就是面向切面编程的能力。

AOP 是什么意思呢？什么是面向切面编程呢？

一个请求过来，可能会经过 Controller（控制器）、Service（服务）、Repository（数据库访问） 的逻辑：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08f3a6dc232428e9c5316fe9c8917ac~tplv-k3u1fbpfcp-watermark.image?)

如果想在这个调用链路里加入一些通用逻辑该怎么加呢？比如日志记录、权限控制、异常处理等。

容易想到的是直接改造 Controller 层代码，加入这段逻辑。

这样可以，但是不优雅，因为这些通用的逻辑侵入到了业务逻辑里面。能不能透明的给这些业务逻辑加上日志、权限等处理呢？

那是不是可以在调用 Controller 之前和之后加入一个执行通用逻辑的阶段呢？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac052597a5c746d79a29984ec41d708f~tplv-k3u1fbpfcp-watermark.image?)

这样的横向扩展点就叫做切面，这种透明的加入一些切面逻辑的编程方式就叫做 AOP （面向切面编程）。

AOP 的好处是可以把一些通用逻辑分离到切面中，保持业务逻辑的存粹性，这样切面逻辑可以复用，还可以动态的增删。

其实 Express 的中间件的洋葱模型也是一种 AOP 的实现，因为你可以透明的在外面包一层，加入一些逻辑，内层感知不到。

而 Nest 实现 AOP 的方式更多，一共有五种，包括 Middleware、Guard、Pipe、Inteceptor、ExceptionFilter：、
