# CPU， 寄存器， 内存

### cpu + 内存结构

人类大脑可以基本实现短期记忆， 在cpu中有一种寄存器（Register），做一些类似短期记忆的事情

推理计算 在cpu种就是算数逻辑单元 (ALU)

长期记忆 就是我们在大脑深处的记忆 对应 cpu的随机存储器 （RAM）

寄存器

![edbb5a4fd6a62a0b7e92680fbe0d6e0.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83887f64d8ef4c96b2ed76ebcde01d3b~tplv-k3u1fbpfcp-watermark.image?)


算数逻辑推理 从两个寄存器中取值进行计算
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/251bd4ca4db14583aa16e4843f3d1307~tplv-k3u1fbpfcp-watermark.image?)

例如 现在有三个寄存器，我们如果想计算 前两个寄存器相乘 ，那么 alu 模块会进行计算 然后返回第三个寄存器当中

对于长期记忆来说 那么就是 随机存储器 长期记忆 就是用来存放内存


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/890608ce58be4e47b6367e51723eef87~tplv-k3u1fbpfcp-watermark.image?)

随机存储器 意思就是 每次访问地址的时间都是相同的


内存中会存放 数据 和 程序

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b74bc48136840eabf5296457c4d72fb~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90acb0c1cf7442e1891ba7072c0c1cc1~tplv-k3u1fbpfcp-watermark.image?)


alu 寄存器
用于计算的指令 都是不涉及内存的

ram 寄存器
是用来  load 指令是说 用来把内存中的数据加载到寄存器中
store 再把数据 存到内存中
mov 是为了 move 把内存地址中的数据移动到其他地址

控制程序流程类似if else 控制程序走向


### 启动

开机的过程 操作系统存在硬盘当中 开机过程当中 会进入到内存 然后再逐级的进入到cpu缓存 最终到达核心alu 进行计算


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50f6da3353a046ed8a1c31c8240c89f7~tplv-k3u1fbpfcp-watermark.image?)


5000  * 0.2 的解析

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b0569f7ece46d789e5c24137fc0729~tplv-k3u1fbpfcp-watermark.image?)


那么程序运行时由什么来驱动的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0399ff2859c540888cb6f4d8c84878ee~tplv-k3u1fbpfcp-watermark.image?)

pc 指针指向 指令空间地址


整个 cpu 执行过程 5000 * 0.2

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c92bdaa255d346589c52e7c171458323~tplv-k3u1fbpfcp-watermark.image?)
