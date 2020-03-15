function FarBg(texture, tick) {
    PIXI.TilingSprite.call(
        this,
        texture,
        texture.baseTexture.width,
        texture.baseTexture.height
        );

    this.x = 0;
    this.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.tick = tick || 0.064;

    this.viewportX = 0;
}

FarBg.prototype = Object.create(PIXI.TilingSprite.prototype);

FarBg.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled *this.tick);
}