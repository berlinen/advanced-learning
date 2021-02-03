## _isEqual

### 设计思路

首先我们判断 a === b，为 true 的情况有两种，其一是 a 和 b 都是基本类型，那么就是两个基本类型的值相同，其二就是两个引用类型，那么就是引用类型的引用相同。那么如果 a === b 为 true，是否就是说 a 和 b 是 equal 的呢？事实上，99% 的情况是这样的，还得考虑 0 和 -0 这个 special case，0 === -0 为 true，而 0 和 -0 被认为是 unequal，至于原因，可以参考

```js
// Identical objects are equal. `0 === -0`, but they aren't identical.
// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
// a === b 时
// 需要注意 `0 === -0` 这个 special case
// 0 和 -0 不相同
// 至于原因可以参考上面的链接
if (a === b) return a !== 0 || 1 / a === 1 / b;
```

接下去的情况，也就是 a !== b 的情况了。

如果 a 和 b 中有一个是 null 或者 undefined，那么可以特判下，不用继续比较了。源码实现：

```js
// A strict comparison is necessary because `null == undefined`.
// 如果 a 和 b 有一个为 null（或者 undefined）
// 判断 a === b
if (a == null || b == null) return a === b;
```

如果类型是 RegExp 和 String，我们可以将 a 和 b 分别转为字符串进行比较（如果是 String 就已经是字符串了），举个栗子：

```js
var a = /a/;
var b = new RegExp("a");

console.log(_isEqual(a, b));
```
其实它在 underscore 内部是这样判断的：

```js
var a = /a/;
var b = new RegExp("a");

var _a = '' + a; // => /a/
var _b = '' + b; // => /a/

console.log(_a === _b); // => true
```

如果是 Number 类型呢？这里又有个 special case，就是 NaN！这里规定，NaN 仅和 NaN 相同，与别的 Number 类型均 unequal。这里我们将引用类型均转为基本类型，看如下代码：

```js
var a = new Number(1);
console.log(+a); // 1
```

没错，加个 + 就解决了，其他的不难理解，都在注释里了。

```js
// `NaN`s are equivalent, but non-reflexive.
// Object(NaN) is equivalent to NaN
// 如果 +a !== +a
// 那么 a 就是 NaN
// 判断 b 是否也是 NaN 即可
if (+a !== +a) return +b !== +b;

// An `egal` comparison is performed for other numeric values.
// 排除了 NaN 干扰
// 还要考虑 0 的干扰
// 用 +a 将 Number() 形式转为基本类型
// 如果 a 为 0，判断 1 / +a === 1 / b
// 否则判断 +a === +b
return +a === 0 ? 1 / +a === 1 / b : +a === +b;

// 如果 a 为 Number 类型
// 要注意 NaN 这个 special number
// NaN 和 NaN 被认为 equal
```

接下来我们看 Date 和 Boolean 两个类型。跟 Number 类型相似，它们也可以用 + 转化为基本类型的数字！看下面代码：

```js
var a = new Date();
var b = true;
var c = new Boolean(false);

console.log(+a); // 1464180857222
console.log(+b); // 1
console.log(+c); // 0
```