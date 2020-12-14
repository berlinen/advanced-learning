## promise 规范及应用 - 1

### 为什么需要promise

js单线程语言 解决异步场景 传统方式 callback

```js
const dynamicFunc = (cb) => {
  setTimeout(() => cb(), 1000);
};
dynamicFunc(() => console.log('on'));
```

### promise/A+ 规范详解

