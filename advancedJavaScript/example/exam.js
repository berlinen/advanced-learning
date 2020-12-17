function dynamicFunc(cb) {
  setTimeout(() => {
    console.log('1s 后显示');
    cb()
  }, 1000)
}

const callback = () => console.log('异步结束后 log')

// 用传入回调函数执行

dynamicFunc(callback)