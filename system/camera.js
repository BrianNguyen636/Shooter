class Camera {
    constructor(game,width,height) {
        Object.assign(this, {game, width, height});
        this.player = game.player;
        this.pCenter = this.player.getCenter();
        this.x = this.pCenter.x - this.width / 2;
        this.y = this.pCenter.y - this.height / 2;
    }

    getCenter() {
        return {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2)
        }
    }

    update() {
        this.pCenter = this.player.getCenter();
        this.x = this.pCenter.x - this.width / 2;
        this.y = this.pCenter.y - this.height / 2;

        this.game.entities.forEach(e => {
            if (e.id != 'player') {
                e.x -= this.player.delta.x;
                e.y -= this.player.delta.y;
            }
        });
    }
}