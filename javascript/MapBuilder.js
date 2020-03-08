function MapBuilder(terrain) {
    this.terrain = terrain;
    this.createMap();
};

MapBuilder.TERRAIN_HEIGHTS = [
    256, // Lowest slice
    224,
    192,
    160,
    128  // Highest slice
];

MapBuilder.prototype.createMap = function() {
    this.createTerrainSpan(3, 9, true);
    this.createGap(1);
    this.createTerrainSpan(1, 30);
    this.createGap(1);
    this.createTerrainSpan(2, 18);
    this.createGap(1);
    this.createSteppedTerrainSpan(2, 5, 28);
    this.createGap(1);
    this.createTerrainSpan(1, 10);
    this.createGap(1);
    this.createTerrainSpan(2, 6); 
    this.createGap(1);
    this.createTerrainSpan(1, 8);
    this.createGap(1);
    this.createTerrainSpan(2, 6);
    this.createGap(1);
    this.createTerrainSpan(1, 8);
    this.createGap(1)
    this.createTerrainSpan(2, 7);
    this.createGap(1);
    this.createTerrainSpan(1, 16);
    this.createGap(1);
    this.createTerrainSpan(2, 6);
    this.createGap(1);
    this.createTerrainSpan(1, 22);
    this.createGap(2);
    this.createTerrainSpan(2, 14);
    this.createGap(2);
    this.createTerrainSpan(3, 8);
    this.createGap(2);
    this.createSteppedTerrainSpan(3, 5, 12);
    this.createGap(3);
    this.createTerrainSpan(0, 8);
    this.createGap(3);
    this.createTerrainSpan(1, 50);
    this.createGap(20);
};

MapBuilder.prototype.createGap = function(spanLength) {
    for (var i = 0; i < spanLength; i++) {
        this.terrain.addSlice(TerrainType.GAP);
    }
};

MapBuilder.prototype.createTerrainSpan = function(
    heightIndex, spanLength, noFront, noBack
) {
    noFront = noFront || false;
    noBack = noBack || false;

    if (!noFront && spanLength > 0) {
        this.addTerrainFront(heightIndex);
        spanLength--;
    }

    var midSpanLength = spanLength - (noBack ? 0 : 1);
    if (midSpanLength > 0) {
        this.addTerrainMid(heightIndex, midSpanLength);
        spanLength -= midSpanLength;
    }

    if (!noBack && spanLength > 0) {
        this.addTerrainBack(heightIndex);
    }
};

MapBuilder.prototype.createSteppedTerrainSpan = function(
    heightIndex, spanALength, spanBLength
) {
    if (heightIndex < 2) {
        heightIndex = 2;
    }

    this.createTerrainSpan(heightIndex, spanALength, false, true);
    this.addTerrainStep(heightIndex - 2);
    this.createTerrainSpan(heightIndex - 2, spanBLength, true, false);
};

MapBuilder.prototype.addTerrainFront = function(heightIndex) {
    var y = MapBuilder.TERRAIN_HEIGHTS[heightIndex];
    this.terrain.addSlice(TerrainType.FRONT, y);
};

MapBuilder.prototype.addTerrainBack = function(heightIndex) {
    var y = MapBuilder.TERRAIN_HEIGHTS[heightIndex];
    this.terrain.addSlice(TerrainType.BACK, y); 
};

MapBuilder.prototype.addTerrainMid = function(heightIndex, spanLength) {
    var y = MapBuilder.TERRAIN_HEIGHTS[heightIndex];
    for (var i = 0; i < spanLength; i++) {
        if (i % 2 == 0) {
            this.terrain.addSlice(TerrainType.WINDOW, y);
        } else {
            this.terrain.addSlice(TerrainType.DECORATION, y);
        }
    }
};

MapBuilder.prototype.addTerrainStep = function(heightIndex) {
    var y = MapBuilder.TERRAIN_HEIGHTS[heightIndex];
    this.terrain.addSlice(TerrainType.STEP, y);
};