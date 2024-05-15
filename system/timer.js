// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;
        this.fps = 60;
        this.maxStep = 1000/this.fps/1000;
        this.lastTimestamp = 0;
        this.timerRun = false;
    };

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) * 1000;
        this.lastTimestamp = current;
        const gameDelta = Math.min(delta, this.maxStep);
        if (this.timerRun) this.gameTime += gameDelta;
        return gameDelta;
    };
};
