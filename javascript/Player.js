function Player(stage, resources) {

    PIXI.Sprite.call(this, resources.eve.texture);

    this.anchor.set(0.5);
    this.x = startEveX;
    this.y = startEveY;

    stage.addChild(this);
}

Player.prototype = Object.create(PIXI.Sprite.prototype);