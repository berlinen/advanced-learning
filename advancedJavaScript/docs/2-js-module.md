## js 模块化详解 - 2

将 JavaScript 代码分开写在不同 的文件里面，然后通过多个 script 标签来加载它们。

```html
<script src="./a.js"></script>
<script src="./b.js"></script>
<script src="./c.js"></script>
```

虽然每个代码块处在不同的文件中，但最终所有 JS 变量 还是会处在同一个 全局作用域 下，这时候就需要额外注 意由于作用域 变量提升 所带来的问题。

```html
<!-- index.html -->
<script>
// a.js
var num = 1;
setTimeout(() => console.log(num), 1000);
</script>
<script>
// b.js
var num = 2; </script>
```

在这个例子中，我们分别加载了两个 script 标签，两段 JS 都声明了 num 变量。第一段脚本的本意本来是希望在 1s 后打印自己声明的 num 变量

1. 但最终运行结果却 打印了第二段脚本中的 num 变量的结果

2. 虽然两段代 码写在不同的文件中，但是因为运行时声明变量都在全 局下，最终产生了冲突。

同时，如果代码块之间有依赖关系的话，需要额外关注 脚本加载的顺序。如果文件依赖顺序有改动，就需要在 html 手动变更加载标签的顺序，非常麻烦。

要解决这样的问题，我们就需要将这些脚本文件「模块化」:

1. 每个模块都要有自己的变量作用域，两个模块之间的 内部变量不会产生冲突。

2. 不同模块之间保留相互导入和导出的方式方法，模 块间能够相互通信。模块的执行与加载遵循一定的规 范，能保证彼此之间的依赖关系。

### CommonJs 规范

Node.js 就是一个基于 V8 引擎，事件驱动 I/O 的服务端 JS 运行环境，在 2009 年刚推出时，它就实现了一套名 为 CommonJS 的模块化规范。

在 CommonJS 规范里，每个 JS 文件就是一个 模块 (module) ，每个模块内部可以使用 require 函数和
module.exports 对象来对模块进行导入和导出。

```js

// 一个比较简单的 CommonJS 模块
const moduleA = require("./moduleA");
// 获 取相邻的相对路径 `./moduleA` 文件导出的结果 module.exports = moduleA;
// 导 出当前模块内部 moduleA 的值
```

下面这三个模块稍微复杂一些，它们都是合法的 CommonJS 模块:

```js
// index.js
require("./moduleA");
var m = require("./moduleB");
console.log(m);
// moduleA.js
var m = require("./moduleB");
setTimeout(() => console.log(m), 1000);
// moduleB.js
var m = new Date().getTime();
module.exports = m;
```

虽然这个例子非常简单，但是我们却可以发现 CommonJS 完美的解决了最开始我们提出的痛点:

1. 模块之间内部即使有相同的变量名，它们运行时没有 冲突。这说明它有处理模块变量作用域的能力。上面 这个例子中三个模块中均有 m 变量，但是并没有冲 突。

2. moduleB通过module.exports导出了一个内部变 量，而它在 moduleA 和 index 模块中能被加载。这 说明它有导入导出模块的方式，同时能够处理基本的 依赖关系。

3. 我们在不同的模块加载了moduleB两次，我们得到 了相同的结果。这说明它保证了模块单例。

这样的 CommonJS 模块只能在 Node.js 环境中 才能运行，直接在其他环境中运行这样的代码模块就会 报错。这是因为只有 node 才会在解析 JS 的过程中提供 一个 require 方法，这样当解析器执行代码时，发现 有模块调用了 require 函数，就会通过参数找到对应 模块的物理路径，通过系统调用从硬盘读取文件内容， 解析这段内容最终拿到导出结果并返回。而其他运行环 境并不一定会在解析时提供这么一个 require 方法， 也就不能直接运行这样的模块了。

从它的执行过程也能看出来 CommonJS 是一个 同步加 载模块 的模块化规范，每当一个模块 require 一个子 模块时，都会停止当前模块的解析直到子模块读取解析 并加载。

### 适合 WEB 开发的 AMD 模块化规范

另一个为 WEB 开发者所熟知的 JS 运行环境就是浏览器 了。浏览器并没有提供像 Node.js 里一样的 require 方法。不过，受到 CommonJS 模块化规范的启发，WEB 端还是逐渐发展起来了 AMD，SystemJS 规范等适 合浏览器端运行的 JS 模块化开发规范。

AMD 全称 Asynchronous module definition，意为 异步的模块定义 ，不同于 CommonJS 规范的同步加载，
AMD 正如其名所有模块默认都是异步加载，这也是早期 为了满足 web 开发的需要，因为如果在 web 端也使用 同步加载，那么⻚面在解析脚本文件的过程中可能使⻚ 面暂停响应。

而 AMD 模块的定义与 CommonJS 稍有不同，上面这个 例子的三个模块分别改成 AMD 规范就类似这样:

```js

// index.js
require(
  ['moduleA', 'moduleB'],
  function(moduleA, moduleB) {
    console.log(moduleB);
  }
);

// moduleA.js
define(function(require) {
  var m = require('moduleB');
  setTimeout(() => console.log(m), 1000);
});

// moduleB.js
define(function(require) {
  var m = new Date().getTime();
  return m;
})
```

我们可以对比看到，AMD 规范也支持文件级别的模块， 模块 ID 默认为文件名，在这个模块文件中，我们需要使 用 define 函数来定义一个模块，在回调函数中接受定 义组件内容。这个回调函数接受一个 require 方法， 能够在组件内部加载其他模块，这里我们分别传入模块 ID，就能加载对应文件内的 AMD 模块。不同于 CommonJS 的是，这个回调函数的返回值即是模块导出 结果。

差异比较大的地方在于我们的入口模块，我们定义好了 moduleA 和 moduleB 之后，入口处需要加载进来它 们，于是乎就需要使用 AMD 提供的 require 函数，第 一个参数写明入口模块的依赖列表，第二个参数作为回 调参数依次会传入前面依赖的导出值，所以这里我们在 index.js 中只需要在回调函数中打印 moduleB 传入的值 即可。

Node.js 里我们直接通过 node index.js 来查看模块 输出结果，在 WEB 端我们就需要使用一个 html 文件， 同时在里面加载这个入口模块。这里我们再加入一个 index.html 作为浏览器中的启动入口。

如果想要使用 AMD 规范，我们还需要添加一个符合 AMD 规范的加载器脚本在⻚面中，符合 AMD 规范实现 的库很多，比较有名的就是 require.js。

```html
<html>
<!-- 此处必须加载 require.js 之类的 AMD 模 块化库之后才可以继续加载模块-->
<script src="/require.js"></script> <!-- 只需要加载入口模块即可 --> <script src="/index.js"></script>
</html>
```

使用 AMD 规范改造项目之后的关系如下图，在物理关 系里多了两个文件，但是模块间的逻辑关系仍与之前相 同。

启动静态服务之后我们打开浏览器中的控制台，无论我 们刷新多少次⻚面，同 Node.js 的例子一样，输出的结 果均相同。同时我们还能看到，虽然我们只加载了 index.js 也就是入口模块，但当使用到 moduleA 和 moduleB 的时候，浏览器就会发请求去获取对应模块的 内容。

从结果上来看，AMD 与 CommonJS 一样，都完美的解 决了上面说的 变量作用域 和 依赖关系 之类的问题。但 是 AMD 这种默认异步，在回调函数中定义模块内容， 相对来说使用起来就会麻烦一些。

同样的，AMD 的模块也不能直接运行在 node 端，因为 内部的 define 函数，require 函数都必须配合在浏览 器中加载 require.js 这类 AMD 库才能使用。

### 能同时被 CommonJS 规范和 AMD 规范加载的 UMD 模块

有时候我们写的模块需要同时运行在浏览器端和 Node.js 里面，这也就需要我们分别写一份 AMD 模块和 CommonJS 模块来运行在各自环境，这样如果每次模块 内容有改动还得去两个地方分别进行更改，就比较麻 烦。

```js
// 一个返回随机数的模块，浏览器使用的 AMD 模块
// math.js
define(function () {
  return function () {
    return Math.random()
  }
})

// 一个返回随机数的模块，Node.js 使用的 CommonJS 模块
module.exports = function () {
  return Math.random()
}
```

基于这样的问题， UMD(Universal Module Definition) 作为一种 同构(isomorphic) 的模块化解决 方案出现，它能够让我们只需要在一个地方定义模块内 容，并同时兼容 AMD 和 CommonJS 语法。

写一个 UMD 模块也非常简单，我们只需要判断一下这 些模块化规范的特征值，判断出当前究竟在哪种模块化 规范的环境下，然后把模块内容用检测出的模块化规范 的语法导出即可。

```js
(function (self, factory) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    // env === commonJs 规范
    module.exports = factory();
  } else if(typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // 什么环境都不是 直接挂载全局对象
    self.umdModule = factory()
  }
}(this, function() {
  return function () {
    return Math.random();
  }
}))
```

上面就是一种定义 UMD 模块的方式，我们可以看到首 先他会检测当前加载模块的规范究竟是什么。

如果module.exports 在当前环境中为对象，那么肯定为 CommonJS，我们就能用 module.exports 导出模块 内容。

如果当前环境中有 define 函数并且define.amd 为 true，那我们就可以使用 AMD 的define 函数来定义一个模块。

最后，即使没检测出来 当前环境的模块化规范，我们也可以直接把模块内容挂载在全局对象上，这样也能加载到模块导出的结果。

### ESModule 规范
