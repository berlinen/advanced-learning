(function () {
  function prepare() {
    const context = document.getElementById('content').getContext('2d');
    const heroImg = new Image();
    return {
      /**
       *
       * @param {Function} [callback] 当准备好之后调用的回调函数
       */
      getResource(callback) {
        heroImg.onload = function () {
          callback && callback(context, heroImg);
        };
        heroImg.src = './hero.png';
      }
    };
  }

  // 画图
  function drawHero(context, heroImg) {
    var imgPos = {
      x: 0,
      y: 0,
      width: 32,
      height: 32
    };

    var rect = {
      x: 0,
      y: 0,
      width: 40,
      height: 40
    };

    context
        .drawImage(
          heroImg,
          imgPos.x,
          imgPos.y,
          imgPos.width,
          imgPos.height,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
        );
  }

  var resourceManager = prepare();
  resourceManager.getResource(function (context, heroImg) {
    drawHero(context, heroImg);
  });

})()