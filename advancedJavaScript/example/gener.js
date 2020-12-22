function Parent(name, actions) {
  this.actions = actions;
  this.name = name;
}

function Child (id, name, actions) {
  Parent.apply(this, Array.from(arguments).slice(1));
  this.id = id;
}

const child1 = new Child(1, "c1", ["eat"]);
const child2 = new Child(2, "c2", ["sing", "jump", "rap"]);

console.log(child1.name); // { actions: [ 'eat' ], name: 'c1', id: 1 }
console.log(child2.name); // { actions: [ 'sing', 'jump', 'rap' ], name: 'c2', id: 2 }