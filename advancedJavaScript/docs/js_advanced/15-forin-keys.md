## 详解forin，Object.keys和Object.getOwnPropertyNames的区别

首先我们需要一个父对象。

```js
var parent = Object.create(Object.prototype, {
  a: {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
  }
})

// parent继承自Object.prototype，有一个可枚举的属性a。下面我们在创建一个继承自parent的对象child。
var child = Object.create(parent, {
  b: {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  c: {
    value: 3,
    writable: true,
    emumerable: false,
    configurable: true
  }
})
// child 有两个属性b和c，其中b为可枚举属性，c为不可枚举属性
// 四种方法遍布child对象， 来比较四种方法的不同，

console.log('answer')
```