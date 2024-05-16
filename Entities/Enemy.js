class Enemy extends Character {
    constructor(name, x, y) {
        super("enemy", name, gameEngine, 100, 100, 30, x, y, 12);
        this.facing = 0;
        // this.setController(new PlayerController(this));
        this.updateCollisionSphere();
    }

    loadAnimations() {
        this.makeAnimation(0, 0, 0, 1, 1); //IDLE
        this.makeAnimation(1, 1, 0, 1, 1); //MOVE
    }

    updateCollisionSphere() {
        this.collider = new CollisionSphere(this.x + this.sWidth / 2, this.y + this.sHeight / 2, this.collisionRadius);
        // console.log(this.collider.x);
    }
    hurt(attacker){
        this.health -= attacker.damage;
    }

    update() {
        let lastPos= {x:this.x, y:this.y}
        // this.controller.update();
        this.updateCollisionSphere();
        // console.log(this.x + ', ' + this.y);
        this.checkCollisions();
        this.delta = {
          x: this.x - lastPos.x,
          y: this.y - lastPos.y
        }
        if (this.dead()) {
            this.removeFromWorld = true;
        }
    }
    checkCollisions(){
        gameEngine.entities.forEach(e => {
            if (e instanceof Projectile) {
                if (e.name == "Reisen" && e.collider.collide(this.collider)) {
                    e.onHit(this);
                }
            }
        });
    }

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);

        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.collider.x,this.collider.y, this.collider.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.globalAlpha = 1;

    };
}