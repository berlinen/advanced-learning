  // 判断变量否为function
  const isFunction = variable => typeof variable === 'function'
  // 定义Promise的三种状态常量
  const PENDING: string = 'PENDING'
  const FULFILLED: string = 'FULFILLED'
  const REJECTED: string = 'REJECTED'


class CustomPromise<T> {
  _handleFunc: (r, j) => void;
  _status: string;
  _value: any;
  _fulfilledQueues: Function[];
  _rejectedQueues: Function[];

  constructor (handle?:(r, j) => void) {
    this._handleFunc = handle;
    this._status =PENDING;
    this._value = undefined;
    this._fulfilledQueues = [];
    this._rejectedQueues = [];
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  };

  _resolve(val: T) {
    if(this._status !== PENDING) return;
    const run = () => {
      this._status = FULFILLED;
      this._value = val;
      let cb;
      while(cb = this._fulfilledQueues.shift()) {
        cb(val);
      }
    }
    setTimeout(() => run(), 0)
  }

  _reject(err: Error) {
    if(this._status !== PENDING) return;
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while(cb === this._rejectedQueues.shift()) {
        cb(err);
      }
    };
    setTimeout(() => run(), 0)

  }

  _then(onFulfilled?: (val) => any, onRejected?: (err) => any): CustomPromise<T> {
    const {_status, _value} = this || {};
    return new CustomPromise((onFulFilledNext, onRejectedNext) => {
      let fulFilled = value => {
        try {
          if(!isFunction(onFulfilled)) {
            onFulFilledNext(value);
          } else {

            let res = onFulfilled(value);
            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
            if(res instanceof CustomPromise) {
              console.log('on2')
              res._then(onFulFilledNext, onRejectedNext)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      }

      let rejected = error => {
        try {
          if(!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if(res instanceof CustomPromise) {
              res._then(onFulFilledNext, onRejectedNext)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      switch(_status) {
        case PENDING:
          this._fulfilledQueues.push(fulFilled);
          this._rejectedQueues.push(rejected);
          break;
        case FULFILLED:
          fulFilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    })
  }
}

// let promise1 = new CustomPromise((resolve, reject) => {
//   resolve(1)
// })

let promise1 = new CustomPromise<number>();

promise1._resolve(2)

const promise2 = promise1._then(res => {
  console.log('res1', res)
})._then(() => {
  console.log('res2', 2)
})


// promise1._resolve('resolve')

// console.log()



// const promise1 = CustomPromise((resolve, reject) => {
//   resolve();
// });

export {}