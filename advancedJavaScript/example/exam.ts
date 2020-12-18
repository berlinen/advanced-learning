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