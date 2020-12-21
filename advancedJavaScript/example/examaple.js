function Player(color) {
  this.color = color;
}

Player.prototype.start = function () {
  console.log(color + '下棋')
}

const whitePlayer = new Player('white');
const blackPlayer = new Player('black');

console.log(blackPlayer.__proto__); // Player { start: [Function] }
console.log(Object.getPrototypeOf(blackPlayer)) // Player { start: [Function] }
console.log(Reflect.getPrototypeOf(blackPlayer)) // Player { start: [Function] }
console.log(Object.getPrototypeOf(blackPlayer) === blackPlayer.__proto__) // true

console.log(Player.prototype) // Player { start: [Function] }
console.log(blackPlayer.__proto__ === Player.prototype) // true
console.log(Player.prototype.constructor === Player) // true
console.log(Player.__proto__) // [Fucntion]