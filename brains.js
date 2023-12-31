/**@type {HTMLCanvasElement}*/
// yo yo

import { gameFrame, incrementGameFrame, getGameFrame } from "./gameFrame.js";

import actorClasses from "./actors.js";
const RamGirl = actorClasses.RamGirl;
const Player = actorClasses.Player;

window.addEventListener('load', function() {
    const cnvs = document.getElementById('canvas');
    const ctx = cnvs.getContext('2d')
    cnvs.width = 885;
    cnvs.height = 500;

    const dojoSprite = new Image()
    dojoSprite.src = 'assets/dojox2.png'

    const katanaSprite = new Image()
    katanaSprite.src = 'assets/katana_x2.png'

    class PlayerKatana {
        constructor(game) {
            this.game = game;
            this.w = 64;
            this.h = 64;
            this.x = this.game.player.x;
            this.y = this.game.player.y;
            this.frameX = 0;
            this.frameY = 0;

            this.rotationOriginX = this.x + this.w * 0.5;
            this.rotationOriginY = this.y + this.h * 0.5;
            this.rotationPointRadius = 2;
            this.angle = 0;
        }
        draw (ctx) {
            // rotation origin point
            ctx.save();
            ctx.translate(this.x + 30, this.y + 50);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x + 32), -(this.y + 50));
            // katana
            ctx.drawImage(katanaSprite, this.w * this.frameX, this.h * this.frameY, this.w, this.h, this.x, this.y, this.w, this.h);
            ctx.restore();
        }
        update() {

            this.x = this.game.player.x;
            this.y = this.game.player.y;


            // this.angle += .1;


            const adjustCoordinates = () => {
                if (this.game.player.frameY === 0) {
                    this.y = this.game.player.y - 5;
                    this.x = this.game.player.x;
                } else if (this.game.player.frameY === 1) {
                    this.y = this.game.player.y - 15;
                    this.x = this.game.player.x + 10;
                } else if (this.game.player.frameY === 2) {
                    this.y = this.game.player.y - 15;
                    this.x = this.game.player.x + 10;
                } else if (this.game.player.frameY === 3) {
                    this.y = this.game.player.y - 15;
                    this.x = this.game.player.x - 5;
                } else null
            }
            adjustCoordinates()
            const adjustDirection = () => {
                if (this.game.player.frameY === 0) {
                    this.frameY = 0;
                } else if (this.game.player.frameY === 1) {
                    this.frameY = 1;
                } else if (this.game.player.frameY === 2) {
                    this.frameY = 0;
                } else if (this.game.player.frameY === 3) {
                    this.frameY = 0;
                } else null
            }
            adjustDirection();

            const adjustAngle = () => {
                if (this.game.player.frameY === 0) {
                    this.angle = (Math.PI/12)
                } else if (this.game.player.frameY === 1) {
                    this.angle = -45*Math.PI/180;
                } else if (this.game.player.frameY === 2) {
                    this.angle = 11*Math.PI/12;
                } else if (this.game.player.frameY === 3) {
                    // this.angle = (3*Math.PI/4)
                    this.angle = 45*Math.PI/180;
                } else null            
            }
            adjustAngle();
        }
    }

    class HardBoundaries {
        constructor (game) {
            this.game = game;

            this.column1W = 10; // was 10
            this.column1H = dojoSprite.height;
            this.column1X = 38;
            this.column1Y = 0;

            this.column2W = 10; // was 10
            this.column2H = dojoSprite.height;
            this.column2X = dojoSprite.width - 48;
            this.column2Y = 0;

            this.row1W = dojoSprite.width;
            this.row1H = 10;
            this.row1X = 0;
            this.row1Y = 0;

            this.row2W = dojoSprite.width;
            this.row2H = 10;
            this.row2X = 0;
            this.row2Y = dojoSprite.height - 40;
        }
        draw (ctx) {
            ctx.save();
            ctx.fillStyle = 'rgba(200, 200, 0, .45)';
            // column1
            ctx.fillRect(this.column1X, this.column1Y, this.column1W, this.column1H);
            // column2
            ctx.fillRect(this.column2X, this.column2Y, this.column2W, this.column2H);
            // column3
            ctx.fillRect(this.row1X, this.row1Y, this.row1W, this.row1H);
            // column4
            ctx.fillRect(this.row2X, this.row2Y, this.row2W, this.row2H);
            ctx.restore();
            
        }
    }

    class ScrollBoundaries {
        constructor(game) {
            this.game = game;

            this.column1W = 0; // was 10
            this.column1H = cnvs.height;
            this.column1X = 0;
            this.column1Y = 0;

            this.column2W = 10;
            this.column2H = cnvs.height;
            this.column2X = cnvs.width - this.column2W;
            this.column2Y = 0;

            this.row1W = cnvs.width;
            this.row1H = 0; //was 10
            this.row1X = 0;
            this.row1Y = 0;

            this.row2W = cnvs.width;
            this.row2H = 10;
            this.row2X = 0;
            this.row2Y = cnvs.height - this.row2H;

            this.translateX = 0;
            this.translateY = 0;
            this.tXSummand = 1;
            this.tYSummand = 0;
        }
        draw(ctx) {
            ctx.save()
            ctx.translate(this.translateX + this.tXSummand, this.translateY + this.tYSummand)
            ctx.fillStyle = 'rgba(200, 0, 0, .45)'
            //columm1
            ctx.fillRect(this.column1X, this.column1Y, this.column1W, this.column1H);
            //column2
            ctx.fillRect(this.column2X, this.column2Y, this.column2W, this.column2H);
            // column3
            ctx.fillRect(this.row1X, this.row1Y, this.row1W, this.row1H);
            // column4
            ctx.fillRect(this.row2X, this.row2Y, this.row2W, this.row2H);
            ctx.restore()
        }
        update() {
            if (this.game.dojoLevel.moveLeft) {
                this.column1X += this.game.player.speed;
                this.column2X += this.game.player.speed;
                this.row1X += this.game.player.speed;
                this.row2X += this.game.player.speed;
            }

            if (this.game.dojoLevel.moveRight) {
                this.column1X -= this.game.player.speed;
                this.column2X -= this.game.player.speed;
                this.row1X -= this.game.player.speed;
                this.row2X -= this.game.player.speed;
            }

            if (this.game.dojoLevel.moveUp) {
                this.column1Y += this.game.player.speed;
                this.column2Y += this.game.player.speed;
                this.row1Y += this.game.player.speed;
                this.row2Y += this.game.player.speed;
            }

            if (this.game.dojoLevel.moveDown) {
                this.column1Y -= this.game.player.speed;
                this.column2Y -= this.game.player.speed;
                this.row1Y -= this.game.player.speed;
                this.row2Y -= this.game.player.speed;
            }
        }
    }

    class DojoLevel {
        constructor (game) {
            this.game = game;
            this.x = 0;
            this.y = 0;
            this.w = 960;
            this.h = 960;
            this.translateX = 0;
            this.translateY = 0;
            this.tXSummand = 0;
            this.tYSummand = 0;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.translateX + this.tXSummand, this.translateY + this.tYSummand)
            ctx.drawImage(dojoSprite, this.x, this.y, this.w, this.h);
        }
        update() {
            const determineMovementDirection = () => {


                if (this.game.player.cameraBoxRightEdge > this.game.scrollBoundaries.column2X && 
                    this.game.player.moveRight === true &&
                    this.game.player.cameraBoxRightEdge < dojoSprite.width // prevents scrolling off screen
                    ) {
                        this.moveLeft = true;
                } else {
                        this.moveLeft = false;
                }

                if (this.game.player.cameraBoxX < this.game.scrollBoundaries.column1X+this.game.scrollBoundaries.column1W && 
                    this.game.player.moveLeft &&
                    this.game.player.cameraBoxX > 0 // prevents scrolling off screen
                    ) {
                    this.moveRight = true
                } else {
                    this.moveRight = false;
                }

                if (this.game.player.cameraBoxBottomEdge > this.game.scrollBoundaries.row2Y && 
                    this.game.player.moveDown &&
                    this.game.player.cameraBoxBottomEdge < dojoSprite.height // prevents scrolling off screen
                    ) {
                    this.moveUp = true;
                } else {
                    this.moveUp = false;
                }

                if (this.game.player.cameraBoxY < this.game.scrollBoundaries.row1Y+this.game.scrollBoundaries.row1H && 
                    this.game.player.moveUp &&
                    this.game.player.cameraBoxY > 0
                    ) {
                    this.moveDown = true;
                } else {
                    this.moveDown = false;
                }
            }
            determineMovementDirection();

            const moveDojo = () => {
                if (this.moveLeft) this.tXSummand = -this.game.player.speed;
                else if (this.moveRight) this.tXSummand = this.game.player.speed;
                else this.tXSummand = 0;
                
                if (this.moveUp) this.tYSummand = -this.game.player.speed;
                else if (this.moveDown) this.tYSummand = this.game.player.speed;
                else this.tYSummand = 0;

                // console.log(this.moveUp)

            }
            moveDojo()


        }
    }

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
                }
                console.log(this.game.keys)
            })
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
            })
        }
    }

    class Game {
        constructor(width, height, cnvs) {
            this.width = width;
            this.height = height;
            this.dojoLevel = new DojoLevel(this);
            this.hardBoundaries = new HardBoundaries(this);
            this.scrollBoundaries = new ScrollBoundaries(this);
            this.player = new Player(this);
            this.playerKatana = new PlayerKatana(this);
            this.ramGirls = [
                new RamGirl(this, {x: 25, y: 100}), 
                new RamGirl(this, {x: 520, y: 90}),
                new RamGirl(this, {x: 30, y: 350}),
                new RamGirl(this, {x: 80, y: 100}),
                new RamGirl(this, {x: 90, y: 250})
            ];
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
            // window.addEventListener('keydown', (e => {
            //     this.mouse.x = e.offsetX - this.mouse.xOff;
            //     this.mouse.y = e.offsetY - this.mouse.yOff;
            // }))

            this.mouseCoordinates = {
                x: 0,
                y: 0
            }

        }
        update() {
            this.dojoLevel.update()
            this.scrollBoundaries.update()
            this.ramGirls.forEach(ramGirl => ramGirl.update());
            this.playerKatana.update()
            this.player.update()

            if (this.dojoLevel.moveLeft)  this.mouse.xOff -= this.player.speed;
            else if (this.dojoLevel.moveRight) this.mouse.xOff += this.player.speed;
            else this.mouse.xOff = this.mouse.xOff;

            if (this.dojoLevel.moveUp) this.mouse.yOff -= this.player.speed;
            else if (this.dojoLevel.moveDown) this.mouse.yOff += this.player.speed;
            else this.mouse.yOff = this.mouse.yOff;

            // console.log(this.mouse.xOff, this.mouse.yOff)

            this.mouseCoordinates.x = this.mouse.x - this.mouse.xOff;
            this.mouseCoordinates.y = this.mouse.y - this.mouse.yOff;

        }
        draw(ctx) {
            // TODO: create queue for draw requests
            this.dojoLevel.draw(ctx);
            this.hardBoundaries.draw(ctx);
            // this.scrollBoundaries.draw(ctx);
            this.ramGirls.forEach(ramGirl => ramGirl.draw(ctx));
            this.playerKatana.draw(ctx);
            this.player.draw(ctx);

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

    const game = new Game(cnvs.width, cnvs.height, cnvs)


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
            incrementGameFrame();

            ctx.clearRect(0, 0, cnvs.width, cnvs.height);
            // ctx.drawImage(dojoSprite, 0, 0)
            game.update()
            game.draw(ctx)

        }

        requestAnimationFrame(animate)

    }

    animate(0);

})
