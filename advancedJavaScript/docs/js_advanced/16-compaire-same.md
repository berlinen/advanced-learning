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