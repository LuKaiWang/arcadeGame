// 这是我们的玩家要躲避的敌人
var Enemy = function() {
  // 要应用到每个敌人的实例的变量写在这里
  // 我们已经提供了一个来帮助你实现更多
  this.x = -101 + Math.round(Math.random() * 505); //随机设置起始X位置
  this.y = 60 + 83 * Math.round(Math.random() * 2); //设置起始Y位置，随机分布于三条石头道路上
  this.v = Math.random() * 500; //移动速度
  // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
  this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
  this.x += dt * this.v; //设置敌人新x位置，
  if (this.x > 600) { //如果出界，则返回起始位置
    this.x = -101;
  }
  // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
  // 都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var playerClass = function() { //玩家类
  this.x = 202; //玩家坐标，初始位置为最下面草地中间位置
  this.y = 378;
  this.sprite = 'images/char-boy.png';
}

//更新玩家位置，暂未添加内容
playerClass.prototype.update = function() {

}

//重设玩家位置为最下面一行草地
playerClass.prototype.reset = function() {
  this.x = 101 * Math.round(Math.random() * 4);
  this.y = 378;
}

// 此为游戏必须的函数，用来在屏幕上画出玩家
playerClass.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

playerClass.prototype.handleInput = function(keys) {
  switch (keys) { //玩家类上下左右移动
    case 'left':
      if (this.x != 0) { //防止左出界
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 404) { //防止右出界
        this.x += 101;
      }
      break;
    case 'up':
      if (this.y > 0) { //防止上出界
        this.y -= 84;
        if (this.y <= 0) {
          this.reset();
        }
      }
      break;
    case 'down':
      if (this.y < 378) { //防止下出界
        this.y += 84;
      }
      break;
    default:
      break;
  }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [];
for (let i = 0; i < 6; i++) { //添加8个敌人
  allEnemies.push(new Enemy());
}
let player = new playerClass(); //实例化玩家

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});