(function () {
  function prepare() {
    const context = document.getElementById('content').getContext('2d');
    const heroImg = new Image();
    let loaded = false;
    return {
      /**
       *
       * @param {Function} [callback] - 当准备好之后调用的回调函数
       */
      getResource(callback) {
        if(loaded) {
          callback && callback(context, heroImg);
          return;
        }
        heroImg.onload = function () {
          callback && callback(context, heroImg);
          loaded = true;
        };
        heroImg.src = './hero.png';
      }
    };
  }

  // 画图
  function drawHero(context, heroImg, {initX, initY}) {
    var imgPos = {
      x: 0,
      y: 0,
      width: 32,
      height: 32
    };

    var rect = {
      x: initX,
      y: initY,
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
    drawHero(context, heroImg, {initX: 0, initY: 0});
  });

  document.getElementById('create').addEventListener('click', function () {
    resourceManager.getResource(function (context, heroImg) {
      drawHero(context, heroImg, {initX: Math.random() * 200, initY: Math.random() * 200});
    });
  });

})()