class Player extends Character {
  constructor(game) {
    super("player", "Reisen", game, 150, 150, 30, 800 - 75, 800 - 75, 100);
    this.facing = 0;
    this.setController(new PlayerController(this));
    this.bulletManager = new PlayerBulletManager(this, this.controller);
    this.updateCollisionSphere();
  }

  loadAnimations() {
    this.makeAnimation(0, 0, 0, 1, 1); //IDLE
    this.makeAnimation(1, 1, 0, 1, 1); //WALK
  }

  updateCollisionSphere() {
    this.collider = new CollisionSphere(this.x + this.sWidth / 2, this.y + this.sHeight / 2, this.collisionRadius);
    // console.log(this.collider.x);
  }


  update() {
    let lastPos= {x:this.x, y:this.y}
    this.controller.update();
    this.updateCollisionSphere();
    // console.log(this.x + ', ' + this.y);
    this.delta = {
      x: this.x - lastPos.x,
      y: this.y - lastPos.y
    }
  }

  draw(ctx) {
    // this.drawShadow(ctx);
    this.animations[this.facing][this.state].drawFrame(
      this.game.clockTick,
      ctx,
      (this.game.camera.width - this.sWidth) / 2,
      (this.game.camera.height - this.sHeight) / 2
    );

    // ctx.beginPath();
    // ctx.strokeStyle = "red";
    // ctx.rect((this.game.camera.width - this.sWidth) / 2,(this.game.camera.height - this.sHeight) / 2,this.sWidth,this.sHeight);
    // ctx.stroke();
    

    // ctx.globalAlpha = 0.5;
    // ctx.beginPath();
    // ctx.arc((this.game.camera.width) / 2,(this.game.camera.height) / 2, this.collider.radius, 0, 2 * Math.PI);
    // ctx.fillStyle = "yellow";
    // ctx.fill();
    // ctx.globalAlpha = 1;
  }
}
