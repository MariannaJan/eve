const KEY_CODES = {
    space: 32,
}

const scroller = document.getElementById('scroller');
const evePath = 'eve.png';

let _x = window.innerWidth * 0.8;
let _y = window.innerHeight / 2;

const renderer = new PIXI.Renderer({
    view: scroller,
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
    console.log('resizing');
    _x = window.innerWidth * 0.8;
    _y = window.innerHeight / 2;

    renderer.resize(_x, _y);
}

activeKeys = [];

function keysDown(e) {
    activeKeys[e.keyCode] = true;
}

function keysUp(e) {
    activeKeys[e.keyCode] = false;
}

const stage = new PIXI.Container();

let eve;
const startEveX = 50;
const startEveY = _y - 50;

const ticker = new PIXI.Ticker();

let loader = PIXI.Loader.shared;

loader.baseUrl = '../assets/images';

loader.add('eve', evePath)
    .on('progress', handleLoadProgress)
    .on('load', handleLoadAsset)
    .on('error', handleLoadError)
    .load(handleLoadComplete);

function handleLoadComplete() {
    eve = new PIXI.Sprite(loader.resources.eve.texture)
    eve.anchor.set(0.5);
    eve.x = startEveX;
    eve.y = startEveY;
    stage.addChild(eve);
    renderer.render(stage);

    //start gameLoop
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

let velocity = 5;
let isJumping = false;

function gameLoop() {
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