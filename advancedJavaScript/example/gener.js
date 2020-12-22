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

Child.prototype = Parent.prototype;

Child.prototype.constructor = Child;

console.log(Parent.prototype); // Child { eat: [Function], childEat: [Function] }

Child.prototype.childEat = function () {
  console.log(`childEat - ${this.name}`);
};

const child1 = new Child(1, "c1", ["hahahahahhah"]);

console.log(Parent.prototype); // Child { eat: [Function], childEat: [Function] }