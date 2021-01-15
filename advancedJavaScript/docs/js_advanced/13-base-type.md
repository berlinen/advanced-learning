## 类型判断

### isArray

```js
function isArray(obj) {
  Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
}
```

### isObject

```js
// Is a given variable an object?
// 判断是否为对象
// 这里的对象包括 function 和 object
function isObject(obj) {
  let type = typeof obj;
  return type === 'function' || type === 'object' && !!obj
}
```

### others

再看 'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error' 这些类型的判断，其实都可以用 Object.prototype.toString.call 来判断，所以写在了一起：

```js
_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
  _['is' + name] = function(obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});
```

