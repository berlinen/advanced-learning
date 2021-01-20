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

### for in

for in是es3中就存在，最早用来遍历对象（集合）的方法。

```js
for(var key in child) {
  console.log(key)
}

// a
// b
```

从输出可以看出，for in会输出自身以及原型链上可枚举的属性。

注意：不同的浏览器对for in属性输出的顺序可能不同。

如果仅想输出自身的属性可以借助 hasOwnProperty。可以过滤掉原型链上的属性。

```js
for(var key in child) {
  if(child.hasOwnProperty(key)) {
    console.log(key);
  }
}

// b
```

上面的代码，仅输出了child自己的可枚举属性b，而没有输出原型parent中的属性。