class PlayerBulletManager {
    constructor(player, controller) {
        Object.assign(this, {player,controller})

        this.damage = 5;
        this.pierce = 0;
        this.projSpeed = 400;
    }

    shoot() {
        // console.log(inputManager.mouse.x, inputManager.mouse.y);
        let target = inputManager.mouse;
        let pCenter = this.player.getCenter();
        let delta_x = (target.x + gameEngine.camera.x) - (pCenter.x)
        let delta_y = (target.y + gameEngine.camera.y) - (pCenter.y)
        let theta_radians = Math.atan2(delta_y, delta_x)
        gameEngine.addEntity(
          new Projectile(this.damage, this.pierce,this.projSpeed,
            -gameEngine.camera.x + pCenter.x - 50, -gameEngine.camera.y + pCenter.y - 50, 
            100, 100, 11,
              -theta_radians*180/Math.PI, 
          null, "Reisen", 0)
        );
      }
}