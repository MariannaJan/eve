function TerrainPool() {
    this.createWindows();
    this.createDecorations();
    this.createFrontEdges();
    this.createBackEdges();
    this.createSteps();
}

TerrainPool.prototype.borrowWindow = function() {
    return this.windows.shift();
};

TerrainPool.prototype.returnWindow = function(sprite) {
    this.windows.push(sprite);
};

TerrainPool.prototype.borrowDecoration = function() {
    return this.decorations.shift();
};

TerrainPool.prototype.returnDecoration = function(sprite) {
    this.decorations.push(sprite);
};

TerrainPool.prototype.borrowFrontEdge = function() {
    return this.frontEdges.shift();
};

TerrainPool.prototype.returnFrontEdge = function(sprite) {
    this.frontEdges.push(sprite);
};

TerrainPool.prototype.borrowBackEdge = function() {
    return this.backEdges.shift();
};

TerrainPool.prototype.returnBackEdge = function(sprite) {
    this.backEdges.push(sprite);
};

TerrainPool.prototype.borrowStep = function() {
    return this.steps.shift();
};

TerrainPool.prototype.returnStep = function(sprite) {
    this.steps.push(sprite);
};

TerrainPool.prototype.addWindowSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = PIXI.Sprite.from(frameId);
        this.windows.push(sprite);
    }
};

TerrainPool.prototype.addDecorationSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite(PIXI.Texture.from(frameId));
        this.decorations.push(sprite);
    }
};

TerrainPool.prototype.addFrontEdgeSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite(PIXI.Texture.from(frameId));
        this.frontEdges.push(sprite);
    }
};

TerrainPool.prototype.addBackEdgeSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite(PIXI.Texture.from(frameId));
        sprite.anchor.x = 1;
        sprite.scale.x = -1;
        this.backEdges.push(sprite);
    }
};

TerrainPool.prototype.addStepSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite(PIXI.Texture.from(frameId));
        sprite.anchor.y = 0.25;
        this.steps.push(sprite);
    }
};

TerrainPool.prototype.shuffle = function(arr) {
    var len = arr.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++) {
        var slice = arr.pop();
        var pos = Math.floor(Math.random() * (len -1));
        arr.splice(pos, 0, slice);
    }
};

TerrainPool.prototype.createWindows = function() {
    this.windows = [];

    this.addWindowSprites(6, "window_01");
    this.addWindowSprites(6, "window_02");

    this.shuffle(this.windows);
};

TerrainPool.prototype.createDecorations = function() {
    this.decorations = [];

    this.addDecorationSprites(6, "decoration_01");
    this.addDecorationSprites(6, "decoration_02");
    this.addDecorationSprites(6, "decoration_03");

    this.shuffle(this.decorations);
};

TerrainPool.prototype.createFrontEdges = function() {
    this.frontEdges = [];

    this.addFrontEdgeSprites(2, "edge_01");
    this.addFrontEdgeSprites(2, "edge_02");

    this.shuffle(this.frontEdges);
};

TerrainPool.prototype.createBackEdges = function() {
    this.backEdges = [];

    this.addBackEdgeSprites(2, "edge_01");
    this.addBackEdgeSprites(2, "edge_02");

    this.shuffle(this.backEdges);
}

TerrainPool.prototype.createSteps = function() {
    this.steps = [];
    this.addStepSprites(2, "step_01");
};