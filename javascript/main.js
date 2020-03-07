function Main() {

    //assets paths
    this.evePath = 'eve.png';
    this.farBgPath = 'bg-far.png';
    this.midBgPath = 'bg-mid.png';
    this.terrainConfPath = 'wall.json'

    this.defaultWidth = 512;
    this.defaultHeight = 384;

    this._y = this.defaultHeight;
    this._x = this.defaultWidth;

    this.stage = new PIXI.Container();

    this.speed = 5;
    this.startEveX = 50;
    this.startEveY = this._y - 50;

    this.velocity = this.speed;
    this.isJumping = false;

    this.activeKeys = [];

    this.addEventListeners.call(this);

    this.setCanvasWidth.call(this);

    this.scrollerCanv = document.getElementById('scroller');

    this. renderer = new PIXI.Renderer({
        view: this.scrollerCanv,
        width: this._x,
        height: this._y,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        backgroundColor: 0xAAAAAA,
    });

    this.ticker = new PIXI.Ticker();
    this.loader = PIXI.Loader.shared;

    this.loadAssets.call(this);

    this.gameLoop.bind(this);

};

Main.prototype.loadAssets = function() {
    this.loader.baseUrl = '../assets/images';
    this.loader.add('eve', this.evePath)
        .add('bgFar', this.farBgPath)
        .add('bgMid', this.midBgPath)
        .add('terrainConf', this.terrainConfPath)
        .on('progress', this.handleLoadProgress.bind(this))
        .on('load', this.handleLoadAsset.bind(this))
        .on('error', this.handleLoadError.bind(this))
        .load(this.handleLoadComplete.bind(this));

    this.loader.load();  
};

Main.prototype.handleLoadComplete = function() {

    this.scroller = new Scroller(this.stage, this.loader.resources);

    // Eve
    this.eve = new Player(this.stage, this.loader.resources, this.startEveX, this.startEveY);


    //terrain
    // this.pool = new TerrainPool();
    // this.slices = [];

    // Render stage
    this.renderer.render(this.stage);

    // Start gameLoop
    this.ticker.add(this.gameLoop.bind(this));
    this.ticker.start();
};

Main.prototype.gameLoop = function() {

    this.scroller.moveViewPortXBy(this.speed);
    this.renderer.render(this.stage);

    if (!this.isJumping) {
        if (this.activeKeys[32]) {
            this.isJumping = true;
            this.eve.y -= 5 * this.velocity;
            this.velocity -= 0.5;
            this.renderer.render(this.stage);
            if (this.eve.y === this.startEveY) {
                this.velocity = 5;
                this.eve.y = this.startEveY;
                this.isJumping = false
            }
        }
    }
    if (this.isJumping) {
        this.eve.y -= 5 * this.velocity;
        this.velocity -= 0.5;
        this.renderer.render(this.stage);
        if (this.eve.y === this.startEveY) {
            this.velocity = 5;
            this.eve.y = this.startEveY;
            this.isJumping = false
        }
    }
};

Main.prototype.setCanvasWidth = function() {
    if (window.innerWidth * 0.5 < this.defaultWidth) {
        this._x = window.innerWidth * 0.5;
    }
};

Main.prototype.addEventListeners = function() {
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('keydown', this.keysDown.bind(this));
    window.addEventListener('keyup', this.keysUp.bind(this));
};

Main.prototype.resize = function() {
    this.setCanvasWidth();
    this.renderer.resize(this._x, this._y);
};

Main.prototype.keysDown = function(e) {
    this.activeKeys[e.keyCode] = true;
};

Main.prototype.keysUp = function(e) {
    this.activeKeys[e.keyCode] = false;
};

Main.prototype.handleLoadAsset = function(loader, resource) {
    console.log('asset loaded: ' + resource.name);
};

Main.prototype.handleLoadProgress = function(loader, resource) {
    console.log(loader.progress + ' %loaded');
};

Main.prototype.handleLoadError = function() {
    console.error('loading error');
};

// Main.prototype.generateTestTerrainSpan = function() {

//     this.terrainSlices = [];

//     var lookupTable = [
//         this.pool.borrowFrontEdge,  // 1st slice
//         this.pool.borrowWindow,     // 2nd slice
//         this.pool.borrowDecoration, // 3rd slice
//         this.pool.borrowStep,       // 4th slice
//         this.pool.borrowWindow,     // 5th slice
//         this.pool.borrowBackEdge    // 6th slice
//     ];

//     var yPos = [
//         128, // 1st slice
//         128, // 2nd slice
//         128, // 3rd slice
//         192, // 4th slice
//         192, // 5th slice
//         192  // 6th slice
//     ];

//     for (var i =0; i < lookupTable.length; i++) {
//         var func = lookupTable[i];

//         var sprite = func.call(this.pool);

//         sprite.x = 64 + (i * 64);
//         sprite.y = yPos[i];

//         this.terrainSlices.push(sprite);

//         this.stage.addChild(sprite);
//     };
// };

// Main.prototype.clearTestTerrainSpan = function() {
//     var lookupTable = [
//         this.pool.returnFrontEdge,  // 1st slice
//         this.pool.returnWindow,     // 2nd slice
//         this.pool.returnDecoration, // 3rd slice
//         this.pool.returnStep,       // 4th slice
//         this.pool.returnWindow,     // 5th slice
//         this.pool.returnBackEdge    // 6th slice
//     ];

//     for (var i = 0; i < lookupTable.length; i++) {
//         var func = lookupTable[i];
//         var sprite = this.terrainSlices[i];

//         this.stage.removeChild(sprite);
//         func.call(this.pool, sprite);
//     }

//     this.terrainSlices = [];
// };