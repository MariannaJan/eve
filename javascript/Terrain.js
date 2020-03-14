function Terrain() {
    PIXI.Container.call(this);

    this.pool = new TerrainPool();
    this.createLookupTables();
    this.terrainSlices = [];

    this.viewportX = 0;
    this.viewportSliceX = 0;
}

Terrain.prototype = Object.create(PIXI.Container.prototype);

Terrain.prototype.setViewportX = function(viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX);

    var prevViewportSliceX = this.viewportSliceX;
    this.viewportSliceX = Math.floor(this.viewportX / TerrainSlice.WIDTH);

    this.removeOlsTerrainSlices(prevViewportSliceX);
    this.addNewTerrainSlices();
};

Terrain.prototype.createLookupTables = function() {
    this.borrowTerrainSpriteLookup = [];
    this.borrowTerrainSpriteLookup[TerrainType.FRONT] = this.pool.borrowFrontEdge;
    this.borrowTerrainSpriteLookup[TerrainType.BACK] = this.pool.borrowBackEdge;
    this.borrowTerrainSpriteLookup[TerrainType.STEP] = this.pool.borrowStep;
    this.borrowTerrainSpriteLookup[TerrainType.DECORATION] = this.pool.borrowDecoration;
    this.borrowTerrainSpriteLookup[TerrainType.WINDOW] = this.pool.borrowWindow;

    this.returnTerrainSpriteLookup = [];
    this.returnTerrainSpriteLookup[TerrainType.FRONT] = this.pool.returnFrontEdge;
    this.returnTerrainSpriteLookup[TerrainType.BACK] = this.pool.returnBackEdge;
    this.returnTerrainSpriteLookup[TerrainType.STEP] = this.pool.returnStep;
    this.returnTerrainSpriteLookup[TerrainType.DECORATION] = this.pool.returnDecoration;
    this.returnTerrainSpriteLookup[TerrainType.WINDOW] = this.pool.returnWindow;
}

Terrain.prototype.addSlice = function(terrainSliceType, y) {
    var slice = new TerrainSlice(terrainSliceType, y);
    this.terrainSlices.push(slice);
};

Terrain.prototype.checkViewportXBounds = function(viewportX) {
    var maxViewportX = (this.terrainSlices.length - Terrain.VIEWPORT_NUM_SLICES) * TerrainSlice.WIDTH;

    if (viewportX < 0) {
        viewportX = 0;
    }
    else if (viewportX >= maxViewportX) {
        viewportX = maxViewportX;
    }
    return viewportX;
};

Terrain.prototype.removeOlsTerrainSlices = function(prevViewportSliceX) {
    var numOldSlices = this.viewportSliceX - prevViewportSliceX;
    if (numOldSlices > Terrain.VIEWPORT_NUM_SLICES) {
        numOldSlices = Terrain.VIEWPORT_NUM_SLICES;
    }

    for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
        var slice = this.terrainSlices[i];
        if (slice.sprite != null) {
            this.returnTerraiinSprite(slice.type, slice.sprite);
            this.removeChild(slice.sprite);
            slice.sprite = null;
        }
    }
};

Terrain.prototype.addNewTerrainSlices = function() {

    var firstX = -(this.viewportX % TerrainSlice.WIDTH);

    for  (var i = this.viewportSliceX, sliceIndex = 0;
        i < this.viewportSliceX + Terrain.VIEWPORT_NUM_SLICES;
        i ++, sliceIndex ++) {

            var slice = this.terrainSlices[i];
            if ((slice.sprite == null) && (slice.type != TerrainType.GAP)) {

                slice.sprite = this.borrowTerrainSprite(slice.type);

                slice.sprite.x = firstX + (sliceIndex * TerrainSlice.WIDTH);
                slice.sprite.y = slice.y;

                this.addChild(slice.sprite);
            }
            else if (slice.sprite != null) {
                slice.sprite.x = firstX + (sliceIndex * TerrainSlice.WIDTH);
            }
        }
};
 
Terrain.prototype.borrowTerrainSprite = function(terrainType) {
    return this.borrowTerrainSpriteLookup[terrainType].call(this.pool);
};

Terrain.prototype.returnTerraiinSprite = function(terrainType, terrainSprite) {
    return this.returnTerrainSpriteLookup[terrainType].call(this.pool, terrainSprite);
};

Terrain.VIEWPORT_WIDTH = 512;
Terrain.VIEWPORT_NUM_SLICES = Math.ceil(Terrain.VIEWPORT_WIDTH / TerrainSlice.WIDTH) + 1;