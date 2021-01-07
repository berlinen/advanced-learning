// function fn(a, b, c) {
//   return a+b+c
// }

// let _fn = fn.bind(null, 10);
// let res = _fn(30, 40, 90);

// console.log(res)

// function list() {
//   return Array.prototype.slice.call(arguments);
// }

// let list1 = list(1, 2, 3);

// // 创建一个有预设值的参数
// let leadingThirtysevenList = list.bind(undefined, 37);
// let list2 = leadingThirtysevenList();
// let list3 = leadingThirtysevenList(1,2,3);

// console.log(list1) // [1,2,3]
// console.log(list2) // [37]
// console.log(list3) // [37,1,2,3]

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// let _Person = Person.bind({});
// let p = new _Person('wx', 24); // Person { name: 'wx', age: 24 }

// console.log(p) // Person { name: 'wx', age: 24 }

// function Person (name, age) {
//   this.name = name
//   this.age = age
// }

// let _Person = Person.bind(null, 'wx');
// let p = new _Person(15);
// console.log(p) //{ name: 'wx', age: 15 }

// let canvas = {
//   render: function () {
//     this.update()
//     this.draw()
//   },

//   update: function () {
//     console.log('update')
//   },

//   draw: function() {
//     console.log('draw')
//   }
// }

// setTimeout(canvas.render.bind(canvas), 1000)

// const args = {"1": "a", "2": "b", "4": "d", length: 5}

// const constructor = [].shift.call(args)

// // let slice = Array.prototype.slice;

// // slice.apply(args);
// // slice(args, 1)

// console.log(constructor)

// function demo(a,b) {
//   console.log(arguments)
//   let unboundSlice = Array.prototype.slice;
//   let slice = Function.prototype.call.bind(unboundSlice);
//   let res = slice(arguments, 1)
//   console.log(res)
// }

// demo(1,2)

var obj = {
  num: 10,
  getCount: function () {
    return this.num
  }
}

let unboundBind = Function.prototype.bind
let bind = Function.prototype.call.bind(unboundBind);

let getCount = bind(obj.getCount, obj)




