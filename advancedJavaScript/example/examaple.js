function Player(color) {
  this.color = color;
  if(!Player.total) {
    Player.total = 0;
  }
  Player.total++
}

let p1 = new Player("white");
console.log(Player.total);
let p2 = new Player("black");
console.log(Player.total); // 2

function ObjectFactory () {
  let obj = new Object();
  let Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.protoType;
  let ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? obj : ret
}

function Parent () {}
function Child () {
  Parent.call(this, Array.from(arguments).slice(1))
}

// Child.prototype = new Parent();

// let TemFunc = function() {};
// TemFunc.prototype = Parent.prototype;
// Child.prototype = new TemFunc()

Object.create(Parent.prototype)


Child.prototype.constructor = Child;