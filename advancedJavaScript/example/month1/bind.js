// function fn(a, b, c) {
//   return a+b+c
// }

// let _fn = fn.bind(null, 10);
// let res = _fn(30, 40, 90);

// console.log(res)

function list() {
  return Array.prototype.slice.call(arguments);
}

let list1 = list(1, 2, 3);

// 创建一个有预设值的参数
let leadingThirtysevenList = list.bind(undefined, 37);
let list2 = leadingThirtysevenList();
let list3 = leadingThirtysevenList(1,2,3);

console.log(list1) // [1,2,3]
console.log(list2) // [37]
console.log(list3) // [37,1,2,3]
