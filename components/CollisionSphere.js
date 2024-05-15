class CollisionSphere {
    constructor(x, y, radius) {
        Object.assign(this, {x,y,radius});
    };
    collide(oth) {
        return getDistance(this, oth) <= (this.radius + oth.radius);
    };
};