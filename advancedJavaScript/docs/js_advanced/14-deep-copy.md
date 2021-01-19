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

### 一行代码的深拷贝

有些同学可能见过用系统自带的JSON来做深拷贝的例子，下面来看下代码实现

```js
function cloneJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
```

其实我第一次简单这个方法的时候，由衷的表示佩服，其实利用工具，达到目的，是非常聪明的做法

下面来测试下cloneJSON有没有溢出的问题，看起来cloneJSON内部也是使用递归的方式

```js
cloneJSON(createData(10000)); // Maximum call stack size exceeded
```

既然是用了递归，那循环引用呢？并没有因为死循环而导致栈溢出啊，原来是JSON.stringify内部做了循环引用的检测，正是我们上面提到破解循环引用的第一种方法：循环检测

```js
var a = {};
a.a = a;

cloneJSON(a) // Uncaught TypeError: Converting circular structure to JSON
```

### 破解递归爆栈

其实破解递归爆栈的方法有两条路，第一种是消除尾递归，但在这个例子中貌似行不通，第二种方法就是干脆不用递归，改用循环，

假设有如下的数据结构


用循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点

首先我们往栈里放入种子数据，key用来存储放哪一个父元素的那一个子元素拷贝对象

然后遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝

```js
function cloneLoop (x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============
  let root = {}; // 根节点
  let loopList = [
    {
      parent: root,
      key: void 0,
      data: x
    }
  ]

  while(loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;
    if(typeof key !== undefined) {
      res = parent[key] = {};
    }

    for(let k in data) {
      if(data.hasOwnProperty(k)) {
        if(Object.proto.toString.call(data[k]) === '[object Object]') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res = data[k];
        }
      }
    }
  }

  return root;
}
```
改用循环后，再也不会出现爆栈的问题了，但是对于循环引用依然无力应对

### 破解循环引用

有没有一种办法可以破解循环应用呢？别着急，我们先来看另一个问题，上面的三种方法都存在的一个问题就是引用丢失，这在某些情况下也许是不能接受的

举个例子，假如一个对象a，a下面的两个键值都引用同一个对象b，经过深拷贝后，a的两个键值会丢失引用关系，从而变成两个不同的对象，o(╯□╰)o

```js
var b = {};
var a = {a1: b, a2: b};

a.a1 === a.a2 // true

var c = clone(a);
c.a1 === c.a2 // false
```

如果我们发现个新对象就把这个对象和他的拷贝存下来，每次拷贝对象前，都先看一下这个对象是不是已经拷贝过了，如果拷贝过了，就不需要拷贝了，直接用原来的，这样我们就能够保留引用关系了

引入一个数组uniqueList用来存储已经拷贝的数组，每次循环遍历时，先判断对象是否在uniqueList中了，如果在的话就不执行拷贝逻辑了
```js
unction cloneForce(x) {
  const uniqueList = [] // 用来去重
  const root = {};

  // 栈
  const looplist = [
    {
      parent: root,
      key: void 0,
      data: x
    }
  ];

  while(looplist.length) {
    // 深度优先
    const node = looplist.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if(typeof key !== undefined) {
      res = parent[key] = {};
    }
    // ====================处理重复拷贝
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if(uniqueData) {
      parent[key] = uniqueData.target;
      continue; // 中断本次循环
    }

    // 数据不存在
    // 保存元数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res
    })
    // ====================处理重复拷贝

    for(let k in data) {
      if(data.hasOwnProperty(k)) {
        if(typeof data[k] === 'object') {
          // 下一次循环
          looplist.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }

    return null;
}
```
破解循环也有作用
```js
var a = {};
a.a = a;

cloneForce(a)
```

cloneForce有两个问题

第一个问题，如果保持引用不是你想要的，那就不能用cloneForce了；

第二个问题，cloneForce在对象数量很多时会出现很大的问题，如果数据量很大不适合使用cloneForce

### 性能对比

我们先来做实验，看数据，影响性能的原因有两个，一个是深度，一个是每层的广度，我们采用固定一个变量，只让一个变量变化的方式来测试性能

测试的方法是在指定的时间内，深拷贝执行的次数，次数越多，证明性能越好

下面的runTime是测试代码的核心片段，下面的例子中，我们可以测试在2秒内运行clone(createData(500, 1)的次数

```js
function runTime(fn, time) {
    var stime = Date.now();
    var count = 0;
    while(Date.now() - stime < time) {
        fn();
        count++;
    }

    return count;
}

runTime(function () { clone(createData(500, 1)) }, 2000);
```

将上面的数据做成表格可以发现，一些规律

随着深度变小，相互之间的差异在变小

clone和cloneLoop的差别并不大

cloneLoop > cloneForce > cloneJSON


#### 我们先来分析下各个方法的时间复杂度问题，各个方法要做的相同事情，这里就不计算，比如循环对象，判断是否为对象

clone时间 = 创建递归函数 + 每个对象处理时间

cloneJSON时间 = 循环检测 + 每个对象处理时间 * 2 （递归转字符串 + 递归解析）

cloneLoop时间 = 每个对象处理时间

cloneForce时间 = 判断对象是否缓存中 + 每个对象处理时间

cloneJSON的速度只有clone的50%，很容易理解，因为其会多进行一次递归时间

cloneForce由于要判断对象是否在缓存中，而导致速度变慢，我们来计算下判断逻辑的时间复杂度，假设对象的个数是n，则其时间复杂度为O(n2)，对象的个数越多，cloneForce的速度会越慢

