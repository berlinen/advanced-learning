function Parent (name, actions) {
  this.name = name;
  this.actions = actions;
}

Parent.prototype.eat = function () {
  console.log(`${this.name} - eat`);
}

function Child (id) {
  Parent.apply(this, Array.from(arguments).slice(1));
  this.id = id;
}
// 模拟Object.create的效果
// 如果直接使⽤用Object.create的话，
// 可以写成Child.prototype = Object.create(Parent.prototype);

let TemFunc = function () {};
TemFunc.prototype = Parent.prototype;
Child.prototype = new TemFunc();

Child.prototype.constructor = Child;

const child1 = new Child(1, "c1", ["hahahahahhah"]);
const child2 = new Child(2, "c2", ["xixixixixixx"])

child1.eat(); // c1 - eat
child2.eat(); // c2 - eat
console.log(child1.eat === child2.eat); // true