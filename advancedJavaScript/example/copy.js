
// var a1 = {b: {c: {}}};

// var a2 = shallowClone(a1); // 浅拷贝
// a2.b.c === a1.b.c // true

// var a3 = clone(a1); // 深拷贝
// a3.b.c === a1.b.c // false

// function shallowClone(source) {
//   var target = {};
//   for(var i in source) {
//     if(source.hasOwnProperty(i)) {
//       target[i] = source[i];
//     }
//   }
//   return target;
// }

// function clone (source) {
//   let target = {};
//   for(let i in source) {
//     if(source.hasOwnProperty(i)) {
//       if(typeof source[i] === 'object') {
//         target[i] = clone(target[i]);
//       } else {
//         target[i] = source[i];
//       }
//     }
//   }
//   return target;
// }

const isObject = Function.prototype.call.bind(Object.prototype.toString)

console.log(isObject([1,2]))

function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for(var i = 0; i < deep; i++) {
    temp = temp['data'] = {};
    for(var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data
}

createData(1, 3) // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}

// 当clone层级很深的话就会栈溢出，但数据的广度不会造成溢出

clone(createData(1000)); // ok
clone(createData(10000)); // Maximum call stack size exceeded

clone(createData(10, 100000)); // ok 广度不会溢出

// 其实大部分情况下不会出现这么深层级的数据，但这种方式还有一个致命的问题，就是循环引用，举个例子

var a = {};
a.a = a;

clone(a) // Maximum call stack size exceeded 直接死循环了有没有，/(ㄒoㄒ)/~~