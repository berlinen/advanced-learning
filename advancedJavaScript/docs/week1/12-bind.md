## 理解 javascript 里的 bind() 函数

bind 方法会创建一个新函数，当这个新函数被调用时候，他的this值传递给bind的第一个参数，他的参数是bind的其他参数和其原本的参数；

语法是这样的

```js
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

thisArg 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。

arg1, arg2, … （可选）当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。

### 参数

bind 的第一个参数会作为原函数运行时的 this 指向，不多说；而第二个开始的参数是可选的，当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。怎么理解？

```js
function fn(a, b, c) {
  return a+b+c
}

let _fn = fn.bind(null, 10);
let res = _fn(30, 40, 90);

console.log(res)
```
