function Parent () {
  this.actions = ['eat', 'run']
}

function Child () {}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child1 = new Child();
const child2 = new Child();

child1.actions.pop();

console.log(child1.actions)  // ['eat']
console.log(child2.actions)  // ['eat']
