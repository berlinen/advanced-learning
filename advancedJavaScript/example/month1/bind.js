function fn(a, b, c) {
  return a+b+c
}

let _fn = fn.bind(null, 10);
let res = _fn(30, 40, 90);

console.log(res)