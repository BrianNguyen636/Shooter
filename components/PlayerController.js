class PlayerController {
  constructor(player) {
    this.player = player;

    this.yVelocity = 0;
    this.xVelocity = 0;

    this.walkspeed = 140;
    this.firerate = 1;
    this.bulletManager = new PlayerBulletManager(this.player, this);
  }

  checkCollisions(){
    if (this.player.collider.x - this.player.collisionRadius < 0) {
      this.player.x = 0 - this.player.sWidth/2 + this.player.collisionRadius;
    }
    if (this.player.collider.x + this.player.collisionRadius > 800 * 2) {
      this.player.x = 800 * 2 - this.player.sWidth/2 - this.player.collisionRadius;
    }
    if (this.player.collider.y - this.player.collisionRadius < 0) {
      this.player.y = 0 - this.player.sHeight/2 + this.player.collisionRadius;
    }
    if (this.player.collider.y + this.player.collisionRadius > 800 * 2) {
      this.player.y = 800 * 2 - this.player.sHeight/2 - this.player.collisionRadius;
    }
  }

  updateState() {
    this.player.state = 0;
    if (inputManager.left || inputManager.right || inputManager.up || inputManager.down) {
      this.player.state = 1;
    }
    if (inputManager.mouse) {
      if (inputManager.mouse.x < 1280 / 2) this.player.facing = 1;
      if (inputManager.mouse.x > 1280 / 2) this.player.facing = 0;
    }
  }

  updateMovement() {
    this.player.y += this.yVelocity * gameEngine.clockTick;
    this.player.x += this.xVelocity * gameEngine.clockTick;
    switch (true) {
      case (inputManager.left && !inputManager.right): {
        if (inputManager.up && !inputManager.down) {
          this.xVelocity = -this.walkspeed / Math.sqrt(2);
          this.yVelocity = -this.walkspeed / Math.sqrt(2);
        } else if (!inputManager.up && inputManager.down) {
          this.xVelocity = -this.walkspeed / Math.sqrt(2);
          this.yVelocity = +this.walkspeed / Math.sqrt(2);
        } else {
          this.xVelocity = -this.walkspeed;
          this.yVelocity = 0;
        }
      } break;
      case (inputManager.right):{
        if (inputManager.up && !inputManager.down) {
          this.xVelocity = this.walkspeed / Math.sqrt(2);
          this.yVelocity = -this.walkspeed / Math.sqrt(2);
        } else if (!inputManager.up && inputManager.down) {
          this.xVelocity = this.walkspeed / Math.sqrt(2);
          this.yVelocity = +this.walkspeed / Math.sqrt(2);
        } else {
          this.xVelocity = this.walkspeed;
          this.yVelocity = 0;
        }
      } break;
      case (inputManager.up && !inputManager.down):{
        this.yVelocity = -this.walkspeed;
        this.xVelocity = 0;
      }break;
      case (!inputManager.up && inputManager.down):{
        this.yVelocity = this.walkspeed;
        this.xVelocity = 0;
      }break;
      default: {
        this.xVelocity = 0;
        this.yVelocity = 0;
      }
      
    }

    if (inputManager.leftMouse) {
      //Shooting code here.
      if (this.shotTimer<=0 || !this.shotTimer) {
        this.bulletManager.shoot();
        this.shotTimer = this.firerate;
      } 
    }
    this.shotTimer -= gameEngine.clockTick;

    this.checkCollisions();
  }



  update() {
    this.updateState();
    this.updateMovement();
  }
}
