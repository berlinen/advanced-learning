var promise1 = new Promise((resolve, reject) => {reject();});
 promise1
.then(null, function() { return 123;
})
.then(null, null) .then(null, null) .then(
() => {
console.log('promise2 已完成');
},
() => {
console.log('promise2 已拒绝'); });