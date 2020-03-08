function Scroller(stage, resources) {

    // Bg Far
    this.bgFar = new FarBg(resources.bgFar.texture);
    stage.addChild(this.bgFar);

    // Bg Mid
    this.bgMid = new MidBg(resources.bgMid.texture);
    stage.addChild(this.bgMid);

    this.terrain = new Terrain();
    stage.addChild(this.terrain);

    this.mapBuilder = new MapBuilder(this.terrain);

    this.viewPortX = 0;
}

Scroller.prototype.setViewportX = function(viewPortX) {
    this.viewPortX = viewPortX;
    this.bgFar.setViewportX(viewPortX);
    this.bgMid.setViewportX(viewPortX);
    this.terrain.setViewportX(viewPortX);
}

Scroller.prototype.getViewportX = function() {
    return this.viewPortX;
}

Scroller.prototype.moveViewPortXBy = function(units) {
    let newViewPortX = this.viewPortX + units;
    this.setViewportX(newViewPortX);
}