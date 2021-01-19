var a = 1;
var b = a;
a = 2;
console.log(a, b); // 2, 1 a,b指向同一数据

// 引用类型
var c = { val: 1 };
var d = c;
c.val = 2;
console.log(c.val, d.val) // 2, 2  全是2 因为c， d指向同一地址
