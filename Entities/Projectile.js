class Projectile {
    constructor(damage, pierce,speed, 
        x, y, width, height, 
        collisionRadius, 
         angle, lifespan,
        name, number) {
        Object.assign(this, {damage,pierce,speed, x,y,width,height,collisionRadius, 
            angle,lifespan,name,number});
        this.id = "projectile"
        this.game = gameEngine;
        this.calculateVelocity();
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + this.name + "Projectiles.png");
        this.updateCollisionSphere();
        

    };
    calculateVelocity() {
        this.radians = this.angle * Math.PI / 180;
        this.xVelocity = this.speed * Math.cos(this.radians);
        this.yVelocity = -this.speed * Math.sin(this.radians);
    };

    updateCollisionSphere() {
        this.collider = new CollisionSphere(this.x + this.width / 2, this.y + this.height / 2, this.collisionRadius)
    }
    update() {
        this.x += this.xVelocity * this.game.clockTick;
        this.y += this.yVelocity * this.game.clockTick;
        this.updateCollisionSphere();
        this.behavior();
        if (this.lifespan != null) {
            if (this.lifespan <= 0) {
                this.removeFromWorld = true;
            } else this.lifespan -= this.game.clockTick;
        }
    };
    behavior() {
        if (this.x + this.width < 0 || this.x > 1280) {
            this.removeFromWorld = true;
        }
        if (this.y > 1600 || this.y < -800) {
            this.removeFromWorld = true;
        }
        if (this.pierce < 0) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        if (!this.removeFromWorld) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(-this.radians);
            ctx.drawImage(this.spritesheet,
                0, this.height * this.number,
                this.width, this.height,
                -this.width / 2, -this.height / 2, 
                this.width, this.height,
            );
            ctx.restore();

            
            // ctx.globalAlpha = 0.5;
            // ctx.beginPath();
            // ctx.arc(this.collider.x,this.collider.y, this.collider.radius, 0, 2 * Math.PI);
            // ctx.fillStyle = "red";
            // ctx.fill();
            // ctx.globalAlpha = 1;
        }

    };
}