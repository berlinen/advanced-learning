// 新建 MyPromise类

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = "fulfilled";
const REJECTED = 'reject';

class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 传入resolve和reject方法
    executor(this.resolve, this.reject);
  }
  // 储存状态的变量初始值是 pending
  status = PENDING;

  // 成功之后的值
  value = null;

  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallback = [];

  // 存储失败回调函数
  onRejectedCallback = [];

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面蒋所有成功的回调拿出来执行
      while(this.onFulfilledCallback.length) {
         // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
         this.onFulfilledCallback.shift()(value);
      }
    }
  };
  // 更改失败后的状态
  reject = (reason) => {
    if(this.status === PENDING) {
      // 状态修改为失败
      this.status === REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while(this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };
  // then
  then = (onFulfilled, onRejected) => {
    // 判断状态
    if(this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value)
    } else if(this.status === REJECTED) {
      // 调用失败回调，把原因返回
      onRejected(this.reason);
    } else if(this.status === PENDING) {
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallback.push(onFulfilled);
      this.onRejectedCallback.push(onRejected);
    }
    // 为了链式调用这里直接创建一个Mypromise，并return出去
  }
}



const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success')
})

function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other')
  })
}
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})
















module.exports = MyPromise;