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

console.log(res) // 80
```

fn 函数需要三个参数，_fn 函数将 10 作为默认的第一个参数，所以只需要传入两个参数即可，如果你不小心传入了三个参数，放心，也只会取前两个。

这有啥用呢？如果某些函数，前几个参数已经 “内定” 了，我们便可以用 bind 返回一个新的函数。也就是说，bind() 能使一个函数拥有预设的初始参数。这些参数（如果有的话）作为 bind() 的第二个参数跟在 this 后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

let list1 = list(1, 2, 3);

// 创建一个有预设值的参数
let leadingThirtysevenList = list.bind(undefined, 37);
let list2 = leadingThirtysevenList();
let list3 = leadingThirtysevenList(1,2,3);

console.log(list1) // [1,2,3]
console.log(list2) // [37]
console.log(list3) // [37,1,2,3]
```

### new

使用 bind 返回的结果还是个 function，是个 function 就可以被 new 运算符调用，那么结果呢？规范中说的很清楚了，当使用 new 操作符调用绑定函数时，bind 的第一个参数无效。

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let _Person = Person.bind({});
let p = new _Person('wx', 24); // Person { name: 'wx', age: 24 }

console.log(p) // Person { name: 'wx', age: 24 }
```

我们也可以设置默认值（参考上一小节），原先提供的那些参数仍然会被前置到构造函数调用的前面。

```js
function Person (name, age) {
  this.name = name
  this.age = age
}

let _Person = Person.bind(null, 'wx');
let p = new _Person(15);
console.log(p) //{ name: 'wx', age: 15 }
```

### 配合setTimeout

什么时候容易丢失 this 指向？恩，setTimeout 是一个场景，很容易把 this 指向 window，当然，setInterval 也是一样。当使用对象的方法时，需要 this 引用对象，你可能需要显式地把 this 绑定到回调函数以便继续使用对象。

```js
let canvas = {
  render: function () {
    this.update()
    this.draw()
  },

  update: function () {
    console.log('update')
  },

  draw: function() {
    console.log('draw')
  }
}

setTimeout(canvas.render.bind(canvas), 1000)
```