/**@type {HTMLCanvasElement}*/

import Player from "/player.js"
import RamGirl from "/enemies/ramGirl.js"
import PlayerKatana from "/weapons/playerKatana.js"
import HardBoundaries from "/levels/dojo/boundaries/hardBoundaries.js"
import ScrollBoundaries from "/levels/dojo/boundaries/scrollBoundaries.js"
import DojoLevel from "/levels/dojo/dojo.js"

const ninjaSprite = new Image()
ninjaSprite.src = 'assets/the_ninja_x2.png'

const dojoSprite = new Image()
dojoSprite.src = 'assets/dojox2.png'

const ramGirlSprite = new Image()
ramGirlSprite.src = 'assets/ramGirl_x1.png'

const katanaSprite = new Image()
katanaSprite.src = 'assets/katana_x2.png'

const manBirdSprite = new Image()
manBirdSprite.src = 'assets/man-bird_x1.png'

const lizardSprite = new Image()
lizardSprite.src = 'assets/lizard_x1.png'

export { dojoSprite, ninjaSprite, ramGirlSprite, katanaSprite, manBirdSprite, lizardSprite }

class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            if((
                (e.key === 'w') ||
                (e.key === 's') ||
                (e.key === 'a') ||
                (e.key === 'd') ||
                (e.key === ' ')
            )
            &&(this.game.keys.indexOf(e.key) === -1)) {
                this.game.keys.push(e.key);
                console.log(this.game.keys)
            }
        })

        window.addEventListener('keyup', e => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            }
        })
    }
}

class Game {
    constructor(cnvs) {
        this.cnvs = cnvs
        this.width = this.cnvs.width;
        this.height = this.cnvs.height;
        this.dojoLevel = new DojoLevel(this);
        this.hardBoundaries = new HardBoundaries(this);
        this.scrollBoundaries = new ScrollBoundaries(this);
        this.player = new Player(this);
        this.playerKatana = new PlayerKatana(this);
        this.ramGirl = new RamGirl(this);
        this.input = new InputHandler(this);
        this.keys = [];
        this.mouse = {
            x: 0,
            y: 0,
            xOff: 0,
            yOff: 0
        }
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        })
        // window.addEventListener('mousemove', (e) => {
        //     this.mouse.x = e.offsetX - this.mouse.xOff;
        //     this.mouse.y = e.offsetY - this.mouse.yOff;
        // })
        this.mouseCoordinates = {
            x: 0,
            y: 0
        }
    }
    update() {
        this.dojoLevel.update()
        this.scrollBoundaries.update()
        this.ramGirl.update()
        this.playerKatana.update()
        this.player.update()

        const dojoMovement = () => {
            if (this.dojoLevel.moveLeft)  this.mouse.xOff -= this.player.speed;
            else if (this.dojoLevel.moveRight) this.mouse.xOff += this.player.speed;
            else this.mouse.xOff = this.mouse.xOff;
            if (this.dojoLevel.moveUp) this.mouse.yOff -= this.player.speed;
            else if (this.dojoLevel.moveDown) this.mouse.yOff += this.player.speed;
            else this.mouse.yOff = this.mouse.yOff;
        }
        dojoMovement();

        const trackMouse = () => {
            this.mouseCoordinates.x = this.mouse.x - this.mouse.xOff;
            this.mouseCoordinates.y = this.mouse.y - this.mouse.yOff;
        }
        trackMouse()




    }
    draw(ctx) {
        this.dojoLevel.draw(ctx);
        this.hardBoundaries.draw(ctx);
        // this.scrollBoundaries.draw(ctx);
        this.ramGirl.draw(ctx);
        this.playerKatana.draw(ctx);
        this.player.draw(ctx);


        // MOUSE
        // ctx.save();
        // ctx.beginPath();
        // ctx.moveTo(this.player.x + this.player.w * 0.5, this.player.y + this.player.h * 0.5);
        // ctx.lineTo(this.mouseCoordinates.x, this.mouseCoordinates.y);
        // ctx.stroke();
        // ctx.restore();
    }

    calcAim (a, b) {
        const dx = a.x = b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance;
        const aimY = dy / distance;
        return [ aimX, aimY, dx, dy ];
    }
}

let gameFrame = 0;

window.addEventListener('load', function() {

    const cnvs = document.getElementById('canvas');
    const ctx = cnvs.getContext('2d')
    cnvs.width = 885;
    cnvs.height = 500;

    const game = new Game(cnvs)

    let frames_per_second = 60;
    let interval = Math.floor(1000 / frames_per_second); // rounding down since our code will rarely run at the exact interval
    let startTime = performance.now();
    let previousTime = startTime;
    let currentTime = 0;
    let deltaTime = 0;

    const animate = (timestamp) => {
        currentTime = timestamp;
        deltaTime = currentTime - previousTime;

        if (deltaTime > interval) {
            previousTime = currentTime - (deltaTime % interval);
            gameFrame++;

            ctx.clearRect(0, 0, cnvs.width, cnvs.height);

            game.update()
            game.draw(ctx)

        }

        requestAnimationFrame(animate)

    }
    animate(0);

})

// EXPORTS
export {gameFrame}