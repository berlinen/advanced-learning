
var a1 = {b: {c: {}}};

var a2 = shallowClone(a1); // 浅拷贝
a2.b.c === a1.b.c // true

var a3 = clone(a1); // 深拷贝
a3.b.c === a1.b.c // false

function shallowClone(source) {
  var target = {};
  for(var i in source) {
    if(source.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
  return target;
}