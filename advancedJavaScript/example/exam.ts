const promise1: () => Promise<void> = () => Reflect.construct(Promise, [(resolve) => {
  setTimeout(() => {
    console.log('已完成 1')
    resolve('promise 1')
  }, 1000);
}])

const promise2: () => Promise<void> = () => Reflect.construct(Promise, [(resolve) => {
  setTimeout(() => {
    console.log('已完成 2')
    resolve('promise 2')
  }, 2000);
}])

// 使用generator函数

function* gen() {
  yield promise1();
  yield promise2();
}

const g = gen();

g.next()
g.next()