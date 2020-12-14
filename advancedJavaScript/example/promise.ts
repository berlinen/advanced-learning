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

  constructor (handle:(r, j) => void) {
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
    this._status = FULFILLED;
    this._value = val;
  }

  _reject(err: Error) {
    if(this._status !== PENDING) return;
    this._status = REJECTED;
    this._value = err;
  }

  _then(onFulfilled: (val) => void, onRejected: (err) => void): CustomPromise<T> {
    const {_status, _value} = this || {};
    switch(_status) {
      case PENDING:
        this._fulfilledQueues.push(onFulfilled);
        this._rejectedQueues.push(onRejected);
        break;
      case FULFILLED:
        onFulfilled(_value);
        break;
      case REJECTED:
        onRejected(_value);
        break;
    };

    return new CustomPromise((onFulFilledNext, onRejectedNext) => {});
  }
}

// const promise1 = CustomPromise((resolve, reject) => {
//   resolve();
// });

