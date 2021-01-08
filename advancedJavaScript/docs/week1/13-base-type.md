## 类型判断

### isArray

```js
function isArray(obj) {
  Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
}
```

### isObject

```js
function isObject(obj) {
  let type = typeof obj;
  return type === 'function' || type === 'object' && !obj
}
```

