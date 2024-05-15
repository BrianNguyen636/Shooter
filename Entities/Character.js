class Character {
    constructor(id, name, game, sWidth, sHeight, collisionRadius, x, y, health) {
        if (this.constructor === Character) throw new Error("Abstract Character Class");
        Object.assign(this, {id, name, game, 
            sWidth, sHeight, //Sprite dimensions
            x, y, //Positions
            collisionRadius,
            health});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/" + name + "Sprites.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./assets/" + name + "SpritesFlip.png");
        this.animations = [[],[]];
        this.loadAnimations();
        this.state = 0; 
        this.facing = 0;

    };
    setController(controller) {this.controller = controller};

    dead() {return this.health <= 0};

    getCenter() {
        return {
            x: this.x + (this.sWidth / 2),
            y: this.y + (this.sHeight / 2)
        }
    }

    updateCollisionSphere() {
        console.log("Update collision");
    }
    loadAnimations() {
        console.log("Load Animations");
    };

    makeAnimation(number, row, column, frameCount, fps) {
        this.animations[0][number] = new Animator(this.spritesheet, column * this.sWidth, row * this.sHeight, this.sWidth, this.sHeight, frameCount, fps); 
        this.animations[1][number] = new Animator(this.spritesheetFlip, column * this.sWidth, row * this.sHeight, this.sWidth, this.sHeight, frameCount, fps); 
    };

    drawShadow(ctx) {
        let distance = 700 - this.BB.bottom;
        let scale = 1 - distance / 700;
        if (scale < 0) scale = 0;
        ctx.beginPath();
        ctx.save();
        ctx.ellipse(this.BB.midX, 700, 70 * scale, 12 * scale, 0, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.controller.update();
        this.updateCollisionSphere();
    }

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };



}