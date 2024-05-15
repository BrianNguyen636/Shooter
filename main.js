const gameEngine = new GameEngine();
const inputManager = new InputManager();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/Crosshair.png")
ASSET_MANAGER.queueDownload("./assets/bg1.png")

ASSET_MANAGER.queueDownload("./assets/ReisenSprites.png")
ASSET_MANAGER.queueDownload("./assets/ReisenSpritesFlip.png")
ASSET_MANAGER.queueDownload("./assets/ReisenProjectiles.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	inputManager.setCtx(ctx);
	gameEngine.init(ctx, player);
	gameEngine.start();
});
