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

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 更改成功后的状态
  resove = (value) => {
    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  };
  // 更改失败后的状态
  reject = (reason) => {
    if(this.status === PENDING) {
      // 状态修改为失败
      this.status === REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  };
}
