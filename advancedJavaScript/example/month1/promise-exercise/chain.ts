const promise1: () => Promise<void> = () => Reflect.construct(Promise, [(resolve) => {
  setTimeout(() => {
    console.log('1 已完成');
    resolve('promise 1');
  }, 1000)
}])

const promise2: () => Promise<void>= () => Reflect.construct(Promise, [(resolve) => {
  setTimeout(() => {
    console.log('2 已完成');
    resolve('promise 2');
  }, 2000)
}])


const promise3: () => Promise<void>= () => Reflect.construct(Promise, [(resolve) => {
  setTimeout(() => {
    console.log('3 已完成');
    resolve('promise 3');
  }, 3000)
}])

// for ----- of
const promiseCreatorList = [promise1, promise2, promise3];

async function promiseChain() {
  for(const promiseItem of promiseCreatorList) {
    await promiseItem();
  }
}

const promiseChain2 = () => promiseCreatorList.reduce((prevPromise, curPromise) => prevPromise ? prevPromise.then(curPromise) : curPromise(), Promise.resolve());

const promiseChain3 = () => {
  promiseCreatorList.map(async (curPromiseItem) => await curPromiseItem())
}
promiseChain3()

export {}