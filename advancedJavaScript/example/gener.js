function Parent(name, actions) {
  this.actions = actions;
  this.name = name;
  this.eat = function () {
    console.log(`${name} - eat`);
  }
}

function Child(id) {
  Parent.apply(this, Array.prototype.slice.call(arguments, 1));
  this.id = id;
}

const child1 = new Child(1, "c1", ["eat"]);
const child2 = new Child(2, "c2", ["sing", "jump", "rap"]);
console.log(child1.eat === child2.eat); // false