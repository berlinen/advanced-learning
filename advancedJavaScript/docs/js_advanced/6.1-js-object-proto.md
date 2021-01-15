## 面向对象变成/原型及原型链

### 面向对象编程

#### 什么是面向对象编程

⾯面向对象是⼀一种编程思想，经常被拿来和⾯面向过程⽐比较。

其实说的简单点，

⾯面向过程关注的重点是动词，是分析出解决问题需要的步骤，然后编写函数实现每个步骤，最 后依次调⽤用函数。

⽽面向对象关注的重点是主谓，是把构成问题的事物拆解为各个对象，而拆解出对象的⽬的也不是为了了实现某个步骤，而是为了描述这个事物在当前问题中的各种行为。

##### ⾯面向对象的特点是什么?

封装:让使用对象的⼈不考虑内部实现，只考虑功能使用 把内部的代码保护起来，只留出⼀一 些 api 接口供用户使用

继承:就是为了代码的复用，从⽗类上继承出⼀一些方法和属性，⼦类也有⾃己的⼀些属性

多态:是不同对象作用于同⼀操作产生不同的效果。多态的思想实际上是把“想做什么”和“谁去 做“分开

##### ⽐如下棋的过程,

⾯向过程是这样的:开局  -> ⽩⽅方下棋  -> 棋盘展示  -> 检查胜负  -> ⿊⽅下棋  -> 棋盘展示  -> 检查  -> 胜负  -> 循环

用代码表示可能是⼀连串串函数的调用
init();
whitePlay(); // ⾥里里⾯面实现⼀一遍下棋的操作 repaint(); // 棋盘展示
check();
blackPlay(); // 再单独实现⼀一遍下棋的操作 repaint(); // 棋盘展示
check();

面向对象是这样的:棋盘.开局 -> 选手.下棋 -> 棋盘.重新展示 -> 棋盘.检查胜负 -> 选手.下棋 -> 棋盘.重新展示 -> 棋盘.检查胜负

用代码表示可能是这样的
const checkerBoard = new CheckerBoard(); // CheckerBoard 类内部封账了了棋盘的操作，⽐比 如初始化棋盘，检查胜负关系等

const whitePlayer = new Player(‘white’); // Player 类内部封装了了各种玩家的操作，⽐比如等待， 落棋，悔悔棋

const blackPlayer = new Player(‘black’);

whitePlayer.start(); // start ⽅方法的结束，内部封装了了或者通过事件发布触发

checkerBoard.repaint()

checkerBoard.check()的调⽤用

blackPlayer.start();

你只需要调用 new ⼀个 player, 然后调用 start 方法，也就是说我们只需要关注⾏为，⽽不需 要知道内部到底做了什么。

#### 在上⾯的例子中，⾯向对象的特性是怎么表现出来的呢?

封装:Player, CheckerBoard 类，使用的时候并不需要知道内部实现了什么，只需要考虑暴露 出的 api 的使⽤

继承:whitePlayer 和 blackPlayer 都继承⾃自 Player，都可以直接使用 Player 的各种⽅法和属 性

多态:whitePlayer.start() 和 blackPlayer.start() 下棋的颜色分别是⽩色和⿊色

#### 什什么时候适合使⽤用⾯面向对象

可以看出来，在⽐比较复杂的问题⾯面前，或者参与⽅方较多的时候，⾯面向对象的编程思想可以很好 的简化问题，并且能够更更好的扩展和维护。

⽽而在⽐比较简单的问题⾯面前，⾯面向对象和⾯面向过程其实差异并不不明显，也可以⼀一步⼀一步地按照步 骤来调⽤用。

### Js 中的⾯向对象
#### 对象包含什什么

⽅法 属性
#### ⼀一些内置对象

Object Array Date Function RegExp
##### 普通⽅方式

每一个新对象都要重写一边color start的赋值

```js
const player = new Object();
Player.color = 'white';
Player.start = function() {
  console.log("white 下棋");
};
```
##### ⼯厂模式，这两种⽅式都⽆法识别对象类型，⽐比如 Player 的类型只是 Object

```js
function createObject() {
  const player = new Object();
  Player.color = 'white';
  Player.start = function() {
    console.log("white 下棋");
  };
  return Player;
}
```
##### 构造函数/实例例

通过 this 添加的属性和⽅法总是指向当前对象的，所以在实例化的时候，通过 this 添加的属 性和方法都会在内存中复制一份，这样就会造成内存的浪费。

但是这样创建的好处是即使改变了某⼀个对象的属性或⽅法，不会影响其他的对象(因为每⼀个对象都是复制的⼀份)

```js
function Player (color) {
  this.color = color;
  this.start = function () {
    console.log(color + "下棋");
  }
}

const whitePlayer = new Player("white");
const blackPlayer = new Player("black");

```

 怎么看函数是不不是在内存中创建了了多次呢?

 ⽐比如 2. 构造函数中，我们可以看到 whitePlayer.start === blackPlayer.start // 输出 false

 ##### 原型

 通过原型继承的⽅法并不⾃身的，我们要在原型链上一层一层的查找，这样创建的好处是只 在内存中创建⼀次，实例化的对象都会指向这个 prototype 对象。

```js
function Player (color) {
  this.color = color;
}

Player.prototype.start = function () {
  console.log(color + "下棋")
}

const whitePlayer = new Player("white");
const blackPlayer = new Player("black");
```
##### 静态属性

是绑定在构造函数上的属性方法，需要通过构造函数访问

⽐比如我们想看⼀一下⼀一共创建了了多少个玩家的实例例

```js
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
```





