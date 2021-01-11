## for...in

for ... in 大家应该都不陌生，循环只遍历可枚举属性。像 Array 和 Object 使用内置构造函数所创建的对象都会继承自 Object.prototype 和 String.prototype 的不可枚举属性，例如 String 的 indexOf() 方法或者 Object 的 toString 方法。循环将迭代对象的所有可枚举属性和从它的构造函数的 prototype 继承而来的（包括被覆盖的内建属性）。

```js
var obj = {name: 'hanzichi', age: 30};

for (var k in obj) {
  console.log(k, obj[k]);
}

// 输出
// name hanzichi
// age 30
```

### 兼容

等等，你跟我说 for ... in 这玩意有浏览器兼容性？！从来没注意过啊，好像工作中也没碰到过这样的兼容性问题啊！确实如此，for ... in 要出问题，得满足两个条件，其一是在 IE < 9 浏览器中（又是万恶的 IE！！），其二是被枚举的对象重写了某些键，比如 toString。

```js
var obj = {toString: 'hanzichi'};

for (var k in obj) {
  alert(k);
}
```

在 chrome 中我们 alert 出了预期的 "toString"，而在 IE 8 中啥都没有弹出。
