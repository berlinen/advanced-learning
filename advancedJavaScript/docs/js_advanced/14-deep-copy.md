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


