## promise 规范及应用 - 1

### 为什么需要promise

js单线程语言 解决异步场景 传统方式 callback

```js
const dynamicFunc = (cb) => {
  setTimeout(() => cb(), 1000);
};
dynamicFunc(() => console.log('on'));
```

### Promise 基础

通过 new Promise() 可构造一个Promise, 接受一个handle参数,

handle 有两个参数 resolve/reject, 对用 已完成/已拒绝

```js
new Promise(handle)

Reflect.construct(Promise, [handle])
```

```js
function promise1 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 定义异步的内容
      console.log('resolve 1s 后输出')
      // 输出完成后，调用函数传入的 resolve 函数，将该 promise 实例标记为已完成，当前 promise 串 行继续执行
      resolve()
    }, 1000)
  })
}

const promise2 = () => Reflect.construct(Promise, [(resolve, reject) => {
  setTimeout(() => {
    console.log('2s 后输出');
    resolve();
  }, 2000)
}])

// 两个 promise 实例，串联起来即可写为:

promise1().then(() => promise2());

// or

promise1.then(promise2);
```

当前 promise 如果状态变为已完成(执行了 resolve 方法)，那么就会去执行 then 方 法中的下一个 promise 函数。

如果 promise变为已拒绝状态（执行reject），那么就会进入后续的异常处理函数中

```js
const promise3 = () => Reflect.construct(Promise, [(resolve, reject) => {
  const random = Math.random() * 10
  setTimeout(() => {
    if(random > 5) {
      resolve(random)
    } else {
      reject(random)
    }
  }, 1000)
}])

const onResolve = (val) => {
  console.log('已完成，输出', val);
}

const onReject = val => {
  console.log('已拒绝，输出', val);
}


// promise 的 then 也可以接受两个函数，第一个参数为 resolve 后执行，第二个函数为 reject 后执行
// promise3().then(onResolve, onReject)

// 也可以通过 .catch 方法拦截状态变为已拒绝时的 promise
// promise3().catch(onReject).then(onResolve)

//也可以通过 try catch 进行拦截状态变为已拒绝的 promise

try {
  promise3().then(onResolve);
} catch (e) {
  onReject(e)
}
```

这个例子使用了三种方式拦截最终变为「已拒绝」状态的 promise，分别是使用 then 的第二个参数，使 用 .catch 方法捕获前方 promise 抛出的异常，使用 try catch 拦截代码块中 promise 抛出的异常

在改变 promise 状态时调用 resolve 和 reject 函数的时候，也可以给下一步 then 中执行的函数传递参数

#### 总结

1. romise 会有三种状态，「进行中」「已完成」和「已拒绝」，进行中状态可以更改为已完成或 已拒绝，已经更改过状态后无法继续更改(例如从已完成改为已拒绝)。

2. ES6 中的 Promise 构造函数，我们构造之后需要传入一个函数，他接受两个函数参数，执行第一 个参数之后就会改变当前 promise 为「已完成」状态，执行第二个参数之后就会变为「已拒绝」 状态。

3. 通过 .then 方法，即可在上一个 promise 达到已完成时继续执行下一个函数或 promise。同时通过 resolve 或 reject 时传入参数，即可给下一个函数或 promise 传入初始值。

4. 已拒绝的 promise，后续可以通过 .catch 方法或是 .then 方法的第二个参数或是 try catch 进行捕 获。

### 封装异步操作为 promise

我们可以将任何接受回调的函数封装为一个 promise，下面举几个简单的例子来说明。

```js
function dynamicFunc(cb) {
  setTimeout(() => {
    console.log('1s 后显示');
    cb()
  }, 1000)
}

const callback = () => console.log('异步结束后 log')

// 用传入回调函数执行

dynamicFunc(callback)
```

promise 版本

```ts
const callback = () => console.log('异步结束后 log')

const promise: () => Promise<void> = () => new Promise((resolve) => {
  setTimeout(() => {
    console.log('1s 后显示');
    resolve();
  }, 1000)
})

promise().then(() => callback())
```

发送 ajax 请求也可以进行封装:

```ts
const ajaxRequest: (url, success, fail) => void = (url: string, success: (res: unknown) =>
{}, fail: (err?: unknown) => void) => {
  const client: XMLHttpRequest = new XMLHttpRequest();
  client.open("GET", url);
  client.onreadystatechange = function () {
    if(this.readyState !== 4) return;
    if(this.status === 200) {
      success(this.response)
    } else {
      fail(new Error(this.statusText));
    };
  }
  client.send();
}

ajaxRequest('/ajax.json', function() {console.log('成功')}, function() {console.log('失败')});
```

调用 ajax 方法时需要传入 success 和 fail 的回调函数进行调用。我们可以不传入回调函数， 通过封装 promise 的方式，在原来的执行回调函数的地 方更改当前 promise 的状态，就可以通过链式调用。

```ts
const ajaxRequestPromise: (url: string) => Promise<unknown> = (url) => new Promise((resolve, reject) => {
  const client: XMLHttpRequest = new XMLHttpRequest();
  client.open("GET", url);
  client.onreadystatechange = function () {
    if(this.readyState !== 4) return;
    if(this.status === 200) {
      resolve(this.response);
    } else {
      reject(new Error(this.statusText));
    };
  };

  client.send();
})

ajaxRequestPromise('./ajax.json')
  .then(() => console.log('success'),() => console.log('fail'))
```

#### 总结

1. 我们可以轻松的把任何一个函数或者是异步函数改为 promise，尤其是异步函数，改为 promise 之后即可 进行链式调用，增强可读性。

2. 将带有回调函数的异步改为promise也很简单，只 需要在内部实例化 promise 之后，在原来执行回调 函数的地方执行对应的更改 promise 状态的函数即 可。

### promise/A+ 规范详解

thenable then 定义了一个then方法的对象或函数

值（value）: 指任何 JavaScript 的合法值(包括 undefined , thenable 和 promise);

异常(exception):是使用 throw 语句抛出的一个 值。

原因(reason):表示一个 promise 的拒绝原因。

#### promise 状态

pending 等待 => 可变为 fulfilled or rejected

fulfilled 已完成 => promise 需满足以下条件: 1. 不能迁 移至其他任何状态 2. 必须拥有一个不可变的值

rejected 已拒绝 => promise 需满足以下条件:1. 不能迁 移至其他任何状态 2. 必须拥有一个不可变的原因

#### thenable

一个 promise 必须提供一个 then 方法以访问其当前值和原因。

promise 的 then 方法接受两个参数

promise.then(onFulfilled, onRejected) 他 们都是可选参数，同时他们都是函数，如果onFulfilled 或 onRejected 不是函数，则需要忽略 他们。

##### onFulfilled 是一个函数

1. 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的值

2. 在 promise 执行结束前其不可被调用

3. 其调用次数不可超过一次

##### onRejected 是一个函数

1. 当 promise 被拒绝执行后其必须被调用，其第一 个参数为 promise 的原因

2. 在 promise 被拒绝执行前其不可被调用

3. 其调用次数不可超过一次

##### 在执行上下文堆栈仅包含平台代码之前，不得调用 onFulfilled 或 onRejected

##### onFulfilled 和 onRejected 必须被作为普通函数 调用(即非实例化调用，这样函数内部 this非严格 模式下指向 window)
##### then 方法可以被同一个 promise 调用多次

1. 当 promise 成功执行时，所有 onFulfilled 需 按照其注册顺序依次回调

2. 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
##### then 方法必须返回一个 promise 对象 promise2 = promise1.then(onFulfilled, onRejected);

1. 只要 onFulfilled 或者 onRejected 返回一个 值 x ，promise 2 都会进入 onFulfilled 状态

2. 如果 onFulfilled 或者 onRejected 抛出一个 异常 e ，则 promise2 必须拒绝执行，并返回拒绝原因e

3. 如果 onFulfilled 不是函数且 promise1 状态变 为已完成， promise2 必须成功执行并返回相同 的值

4. 如果 onRejected 不是函数且 promise1 状态变 为已拒绝， promise2 必须执行拒绝回调并返回 相同的拒绝原因

```ts
const promise1 = new Promise((resolve, reject) => {
  reject();
})

const promise2 = promise1.then(
  null,
  function() {
    return  123
  }
)

promise2
  .then(
    () => {
      console.log('promise 2 已完成')
    },
    () => {
      console.log('promise2 已拒绝')
    }
  )
// promise 2 已完成
```
#### promise 的解决过程

Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]]

(promise, x)(这句话的意思就是把 promise resolve 了，同时传入 x 作为值)

```js
promise.then(
  function(x) {
    console.log('会执行这个函数，同时传入 x 变量的值', x);
  }
);
```

如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态;否则其用 x 的 值来执行 promise 。

1. 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise

2. 如果 x 为 promise

  . 如果 x 处于等待态， promise 需保持为等待态直 至 x 被执行或拒绝

  . 如果 x 处于已完成态，用相同的值执行 promise

  . 如果 x 处于拒绝态，用相同的据因拒绝 promise

```ts
const promise1: () => Promise<void> = () => Reflect.construct(Promise, [(resolve) => {
  setTimeout(() => {
    console.log(1);
    resolve();
  }, 1000)
}])

const promise2: () => Promise<void> = () => new Promise((resolve) => {
  setTimeout(() => {
    console.log(2);
    resolve();
  }, 2000);
})

promise1()
  .then(() => promise2())
  .then(
    () => console.log('已完成'),
    () => console.log('已拒绝')
  )
/**
 * back
 * 1
 * 2
 * 已完成
```