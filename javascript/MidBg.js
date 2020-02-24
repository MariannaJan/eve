function MidBg(texture, tick) {
    PIXI.extras.TilingSprite.call(
        this,
        texture,
        texture.baseTexture.width,
        texture.baseTexture.height
    );

    this.x = 0;
    this.y = 128;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.tick = tick || 0.64
    this.viewportX = 0;
}

MidBg.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

MidBg.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled *this.tick);
}