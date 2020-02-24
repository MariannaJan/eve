const KEY_CODES = {
    space: 32,
}

const scrollerCanv = document.getElementById('scroller');

//assets paths
const evePath = 'eve.png';
const farBgPath = 'bg-far.png';
const midBgPath = 'bg-mid.png';

const defaultWidth = 512;
const defaultHeight = 384;

let _y = defaultHeight;
let _x = defaultWidth;

setCanvasWidth();

function setCanvasWidth() {
    if (window.innerWidth * 0.5 < defaultWidth) {
        _x = window.innerWidth * 0.5;
    }
}


const renderer = new PIXI.Renderer({
    view: scrollerCanv,
    width: _x,
    height: _y,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0xAAAAAA,
});

window.addEventListener('resize', resize);
window.addEventListener('keydown', keysDown);
window.addEventListener('keyup', keysUp);

function resize() {
    setCanvasWidth();
    renderer.resize(_x, _y);
}

let activeKeys = [];

function keysDown(e) {
    activeKeys[e.keyCode] = true;
}

function keysUp(e) {
    activeKeys[e.keyCode] = false;
}

const stage = new PIXI.Container();

const speed = 5;

// Eve initial setup
let eve;
const startEveX = 50;
const startEveY = _y - 50;


const ticker = new PIXI.Ticker();

let loader = PIXI.Loader.shared;

loader.baseUrl = '../assets/images';

loader.add('eve', evePath)
    .add('bgFar', farBgPath)
    .add('bgMid', midBgPath)
    .on('progress', handleLoadProgress)
    .on('load', handleLoadAsset)
    .on('error', handleLoadError)
    .load(handleLoadComplete);

let scroller;

function handleLoadComplete() {

    scroller = new Scroller(stage, loader.resources);

    // Eve
    eve = new Player(stage, loader.resources);

    // Render stage
    renderer.render(stage);

    // Start gameLoop
    ticker.add(gameLoop);
    ticker.start();
}

function handleLoadAsset(loader, resource) {
    console.log('asset loaded: ' + resource.name);
}

function handleLoadProgress(loader, resource) {
    console.log(loader.progress + ' %loaded');
}

function handleLoadError() {
    console.error('loading error');
}

let velocity = speed;
let isJumping = false;

function gameLoop() {

    scroller.moveViewPortXBy(speed);
    renderer.render(stage);

    if (!isJumping) {
        if (activeKeys[32]) {
            isJumping = true;
            eve.y -= 5 * velocity;
            velocity -= 0.5;
            renderer.render(stage);
            if (eve.y === startEveY) {
                velocity = 5;
                eve.y = startEveY;
                isJumping = false
            }
        }
    }
    if (isJumping) {
        eve.y -= 5 * velocity;
        velocity -= 0.5;
        renderer.render(stage);
        if (eve.y === startEveY) {
            velocity = 5;
            eve.y = startEveY;
            isJumping = false
        }
    }
}