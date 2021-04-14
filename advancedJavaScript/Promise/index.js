// 新建 MyPromise类

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = "fulfilled";
const REJECTED = 'reject';

class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 传入resolve和reject方法
    // 错误捕获
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error)
    }
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
    // 如果不传就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw new Error(reason) };
    // 为了链式调用这里直接创建一个Mypromise，并return出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中会立即执行
      if(this.status === FULFILLED) {
        // 创建一个微任务等待promise2完成初始化
        queueMicrotask(() => {
         // 捕获error
         try {
          // 获取成功回调函数执行的结果
          const x = onFulfilled(this.value);
          // resolvePromise 集中处理，将 promise2 传入
          resolvePromise(promise2, x, resolve, reject);
         } catch(error) {
           reject(error)
         }
        })
      } else if(this.status === REJECTED) {
        // 调用失败回调，并且把原因返回
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
         try {
          // 调用失败回调，并且把原因返回
          const x = onRejected(this.reason);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject)
         } catch (error) {
           reject(error);
         }
        })
      } else if(this.status === PENDING) {
         // 等待
         // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
         // 等到执行成功失败函数的时候再传递
         this.onFulfilledCallback.push(() => {
          queueMicrotask(() => {
            try {
             // 获取成功回调函数的执行结果
             const x = onFulfilled(this.value);
             // 传入 resolvePromise 集中处理
             resolvePromise(promise2, x, resolve, reject);
            } catch(error) {
              reject(error);
            }
          })
         });
         this.onRejectedCallback.push(() => {
           queueMicrotask(() => {
             try {
              // 获取成功回调函数的执行结果
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
             } catch (error) {
               reject(error)
             }
           })
         })
      }
    })

    return promise2;
  }
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if(parameter instanceof MyPromise) {
      return parameter;
    }
    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    })
  }
  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
   // 如果相等了，说明return的是自己，抛出类型错误并返回
   if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
   }
   // 判断x是不是 MyPromise 实例对象
   if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
   } else {
     // 普通值
     resolve(x);
   }
}

// function resolvePromise(x, resolve, reject) {
//    // 判断x是不是 MyPromise 实例对象
//    if(x instanceof MyPromise) {
//      // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
//      // x.then(value => resolve(value), reason => reject(reason))
//      // 简化之后
//      x.then(resolve, reject);
//    } else {
//      // 普通值
//      resolve(x)
//    }
// }

// test.js




MyPromise.resolve().then(() => {
  console.log(0);
  return MyPromise.resolve(4);
}).then((res) => {
  console.log(res)
})




























module.exports = MyPromise;