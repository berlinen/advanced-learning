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