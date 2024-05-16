// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        this.uiManager = new UIManager(this);

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx, player) {
        this.ctx = ctx;
        inputManager.startInput();
        this.timer = new Timer();
        this.entities = [];
        this.addEntity(player);
        this.player = player;
        this.camera = new Camera(this,1280, 800);
        this.addEntity(new Enemy("BlueFairy", 200, 600));
        this.addEntity(new Enemy("BlueFairy", 200, 200));

        this.addEntity(new Enemy("BlueFairy", 200, 400));

    };

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    reset() {
        this.init(this.ctx, new Player(this));
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        //DRAW THE BACKGROUND
        this.ctx.drawImage(ASSET_MANAGER.getAsset("./assets/bg1.png"),
        -this.camera.x, -this.camera.y, 
        800 * 2, 800 * 2)



        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            entity.draw(this.ctx, this);
        }

        this.uiManager.draw(this.ctx);

        if (inputManager.mouse) {
            this.ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Crosshair.png"),
            inputManager.mouse.x - 50, inputManager.mouse.y - 50, 
            100,100)
        }
    };



    update() {
        let entitiesCount = this.entities.length;
        
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        for (let i = entitiesCount - 1; i >= 0; --i) {
            let entity = this.entities[i];
            if (entity.removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        this.camera.update();
    };


    pause() {
        if (!this.paused && !this.startMenu) {
            this.paused = true;
            this.menuController.selected = 0;
            ASSET_MANAGER.playSound("Pause");
            ASSET_MANAGER.pauseBGM();
        }
    };

    loop() {

        inputManager.update();
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();

    };

};
