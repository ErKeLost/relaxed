# Http 数组传输的五种方式

对于前端来说，后端主要是提供 http 接口，前端通过 http 接口获取数据，然后渲染页面。而这种数据传输的方式，主要有以下五种：

1. url param
2. query string
3. form data
4. form urlencoded
5. json

## url param

url param 是指 url 中的参数，例如：

```js
// http://localhost:3000/user/1
```

上面的 url 中，`user` 是路由，`1` 是 url param。

## query string

query string 是指 url 中的查询参数，例如：

```js
// http://localhost:3000/user?id=1
```

上面的 url 中，`user` 是路由，`id=1` 是 query string。

其中非英文的字符，需要使用 `encodeURIComponent` 进行编码，例如：

```js
// http://localhost:3000/user?name=%E5%BC%A0%E4%B8%89
```

上面的 query 是由 `name=张三` 编码而来的。或者使用封装了一层的 query-string，例如：

```ts
// http://localhost:3000/user?name=%E5%BC%A0%E4%B8%89
const queryString = require('query-string')
const query = queryString.stringify({ name: '张三' })
```

## form urlencoded

form urlencoded 是指表单提交的数据
他和 query string 的区别在于，他是通过表单提交的，而 query string 是通过 url 传递的。放在了 body 里面，而不是 url 里面。然后需要指定 content-type 为 `application/x-www-form-urlencoded`。

通过 & 分隔的 form-urlencoded 方式需要对内容做 url encode 如果传递大量数据，会导致 url 过长，所以有了 form data。

## form data

form data 是指表单提交的数据，他和 form urlencoded 的区别在于，他不需要对内容做 url encode，而是直接传递原始数据。放在了 body 里面，而不是 url 里面。然后需要指定 content-type 为 `multipart/form-data`。

form data 不在通过 & 分隔 而是通过 boundary 分隔，boundary 是一个随机字符串，用来分隔每个字段。 类似 --------------------------7da24f2e50046

不需要对内容做 url encode，所以可以传递大量数据，但是需要指定 content-type 为 `multipart/form-data`。

## json

form-urlencoded 需要对内容做 url encode，而 form data 不需要对内容做 url encode，但是需要指定 content-type 为 `multipart/form-data`。并且需要加一段很长的 boundary ，而 json 既不需要对内容做 url encode，也不需要指定 content-type 为 `multipart/form-data`。

## 总结

其中前两种是 url 中的：

url param： url 中的参数，Nest 中使用 @Param 来取
query：url 中 ? 后的字符串，Nest 中使用 @Query 来取
后三种是 body 中的：

form urlencoded： 类似 query 字符串，只不过是放在 body 中。Nest 中使用 @Body 来取，axios 中需要指定 content type 为 application/x-www-form-urlencoded，并且对数据用 qs 或者 query-string 库做 url encode
json： json 格式的数据。Nest 中使用 @Body 来取，axios 中不需要单独指定 content type，axios 内部会处理。
form data：通过 ----- 作为 boundary 分隔的数据。主要用于传输文件，Nest 中要使用 FilesInterceptor 来处理其中的 binary 字段，用 @UseInterceptors 来启用，其余字段用 @Body 来取。axios 中需要指定 content type 为 multipart/form-data，并且用 FormData 对象来封装传输的内容。
