## 深拷贝

### 深拷贝VS浅拷贝

其实深拷贝和浅拷贝都是针对的引用类型，JS中的变量类型分为值类型（基本类型）和引用类型；对值类型进行复制操作会对值进行一份拷贝，而对引用类型赋值，则会进行地址的拷贝，最终两个变量指向同一份数据

```js
var a = 1;
var b = a;
a = 2;
console.log(a, b); // 2, 1 a,b指向同一数据

// 引用类型
var c = { val: 1 };
var d = c;
c.val = 2;
console.log(c.val, d.val) // 2, 2  全是2 因为c， d指向同一地址
```

对于引用类型，会导致a b指向同一份数据，此时如果对其中一个进行修改，就会影响到另外一个，有时候这可能不是我们想要的结果，如果对这种现象不清楚的话，还可能造成不必要的bug

那么如何切断a和b之间的关系呢，可以拷贝一份a的数据，根据拷贝的层级不同可以分为浅拷贝和深拷贝，浅拷贝就是只进行一层拷贝，深拷贝就是无限层级拷贝

```js

var a1 = {b: {c: {}}};

var a2 = shallowClone(a1); // 浅拷贝
a2.b.c === a1.b.c // true

var a3 = clone(a1); // 深拷贝
a3.b.c === a1.b.c // false
```

浅拷贝的实现非常简单，而且还有多种方法，其实就是遍历对象属性的问题，这里只给出一种，如果看不懂下面的方法，或对其他方法感兴趣，可以看我的这篇文章

```js
function shallowClone(source) {
  var target = {};
  for(var i in source) {
    if(source.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
  return target;
}
```

### 最简单的深拷贝

深拷贝的问题其实可以分解成两个问题，浅拷贝+递归，什么意思呢？假设我们有如下数据

```js
var a1= {b: {c: {d: 1}}}
```
只需稍加改动上面浅拷贝的代码即可，注意区别

```js
function clone (source) {
  let target = {};
  for(let i in source) {
    if(source.hasOwnProperty(i)) {
      if(typeof source[i] === 'object') {
        target[i] = clone(target[i]);
      } else {
        target[i] = source[i];
      }
    }
  }
  return target;
}
```

其实上面的代码问题太多了

1. 没有对参数做检验

2. 判断是否对象的逻辑不够严谨

3. 没有考虑数组的兼容

每一个解决办法

1. 判断对象的方法

```js
const isObject = Function.prototype.call.bind(Object.prototype.toString)

console.log(isObject([1,2]))

function isObject2 (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
```

函数需要校验参数，如果不是对象的话直接返回

```js
function clone (source) {
  if(!isObject(source)) return source;
}
```

其实吧这三个都是小问题，其实递归方法最大的问题在于爆栈，当数据的层次很深是就会栈溢出

下面的代码可以生成指定深度和每层广度的代码，这段代码我们后面还会再次用到

```js
function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for(var i = 0; i < deep; i++) {
    temp = temp['data'] = {};
    for(var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data
}

createData(1, 3) // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}

// 当clone层级很深的话就会栈溢出，但数据的广度不会造成溢出

clone(createData(1000)); // ok
clone(createData(10000)); // Maximum call stack size exceeded

clone(createData(10, 100000)); // ok 广度不会溢出

// 其实大部分情况下不会出现这么深层级的数据，但这种方式还有一个致命的问题，就是循环引用，举个例子

var a = {};
a.a = a;

clone(a) // Maximum call stack size exceeded 直接死循环了有没有，/(ㄒoㄒ)/~~
```

关于循环引用的问题解决思路有两种，一直是循环检测，一种是暴力破解，关于循环检测大家可以自己思考下；关于暴力破解我们会在下面的内容中详细讲解




