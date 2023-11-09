/**@type {HTMLCanvasElement}*/
// yo yo

import { gameFrame, incrementGameFrame, getGameFrame } from "./gameFrame.js";

import classUtils from "./classUtils.js";
const hOverrides = classUtils.hOverrides;

import actorClasses from "./actors.js";
const RamGirl = actorClasses.RamGirl;

const ninjaSprite = new Image()
ninjaSprite.src = 'assets/the_ninja_x2.png'

const dojoSprite = new Image()
dojoSprite.src = 'assets/dojox2.png'

const ramGirlSprite = new Image()
ramGirlSprite.src = 'assets/ramGirl_x1.png'

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
                this.x = this.game.player.x - 5;
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
                this.angle = -20*Math.PI/180;
            } else if (this.game.player.frameY === 1) {
                this.angle = -45*Math.PI/180;
            } else if (this.game.player.frameY === 2) {
                // this.angle = 11*Math.PI/12;
                this.angle = 165*Math.PI/180
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
        this.column1H = this.game.height;
        this.column1X = 0;
        this.column1Y = 0;

        this.column2W = 10;
        this.column2H = this.game.height;
        this.column2X = this.game.width - this.column2W;
        this.column2Y = 0;

        this.row1W = this.game.width;
        this.row1H = 0; //was 10
        this.row1X = 0;
        this.row1Y = 0;

        this.row2W = this.game.width;
        this.row2H = 10;
        this.row2X = 0;
        this.row2Y = this.game.height - this.row2H;

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

/*
class RamGirl {
    constructor(game) {
        this.game = game;
        this.w = 64;
        this.h = 64;
        this.x = 300;
        this.y = 300;
        this.frameX = 0;
        this.frameY = 0;
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
        this.speed = 1;
        this.walk = false;
        this.attack = true;
        // future state for idling movement, will update for random chance
        this.idling = false;
        this.idlingInterval = setInterval(() => {
            this.moveLeft = !this.moveLeft; 
            this.moveRight = !this.moveRight;
        }, Math.ceil(Math.random(0, 1) * 800) + 300)
    }
    draw (ctx) {
        ctx.drawImage(ramGirlSprite, this.w*this.frameX, this.h*this.frameY, this.w, this.h, this.x, this.y, this.w, this.h)
    }
    update () {
        const ramDirection = () => {
            if (this.moveRight && this.moveUp || 
                this.moveRight && this.moveDown ||
                this.moveRight) {
                    this.frameY = 1;
            }
            if (this.moveLeft && this.moveUp ||
                this.moveLeft && this.moveDown ||
                this.moveLeft) {
                    this.frameY = 0
            }
            if (this.moveUp &&
                !this.moveLeft &&
                !this.moveRight) {
                    this.frameY = 0;
            }
            if (this.moveDown &&
                !this.moveLeft &&
                !this.moveRight) {
                    this.frameY = 1
                }
        }
        ramDirection();

        const ramMovement = () => {
            if (this.moveRight) this.x += this.speed;
            if (this.moveLeft) this.x -= this.speed;
            if (this.moveUp) this.y -= this.speed;
            if (this.moveDown) this.y += this.speed;
        }
        ramMovement();

        const ramWalk = () => {
            if (this.walk) {
                if (gameFrame % 10 === 0) {
                    if(this.frameX < 4) {
                        this.frameX ++;} 
                    else {this.frameX = 1}
                }
            }
            if (!this.walk && !this.attack) {
                this.frameX = 0;
            }
        }
        ramWalk();

        const ramAttack = () => {
            if (this.attack) {
                if (gameFrame % 10 === 0) {
                    if(this.frameX < 7) {
                        this.frameX ++;} 
                    else {this.frameX = 7}
                }
            }
        }
        ramAttack()

    }
}
*/

class Player {
    constructor(game) {
        this.game = game;
        this.w = 64;
        this.h = 64;
        this.x = 200;
        this.y = 150;
        this.frameX = 0;
        this.frameY = 1;

        this.speed = 5;
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.hitBox = false;
        this.hitBoxX = this.x +26;
        this.hitBoxY = this.y +22;
        this.hitBoxW = 12;
        this.hitBoxH = 30;

        this.cameraBox = false;
        this.cameraBoxW = 400;
        this.cameraBoxH = 300;
        this.cameraBoxX = (this.x + this.w * 0.5) - this.cameraBoxW * 0.5;
        this.cameraBoxY = (this.y + this.h * 0.5) - (this.cameraBoxH * 0.5);
        this.cameraBoxRightEdge = this.cameraBoxX + this.cameraBoxW;
        this.cameraBoxBottomEdge = this.cameraBoxY + this.cameraBoxH;

        this.boundaryBox = false;
        this.boundaryBoxW = 20;
        this.boundaryBoxH = 46;
        this.boundaryBoxX = (this.x + this.w * 0.5) - (this.boundaryBoxW * 0.5);
        this.boundaryBoxY = (this.y + this.h * 0.5) - (this.boundaryBoxH * 0.35);
        this.boundaryBoxRightEdge = this.boundaryBoxX + this.boundaryBoxW;
        this.boundaryBoxBottomEdge = this.boundaryBoxY + this.boundaryBoxH;

        this.aim;

    }
    draw(ctx) {

        const drawPlayer = () => {
            ctx.drawImage(ninjaSprite, this.w*this.frameX, this.h*this.frameY, this.w, this.h, this.x, this.y, this.w, this.h)
        }
        drawPlayer();

        const drawHitBox = () => {
            if (this.hitBox) {
                ctx.save();
                ctx.fillStyle = "rgba(100, 11, 200, 0.45)";
                ctx.fillRect(this.hitBoxX, this.hitBoxY, this.hitBoxW, this.hitBoxH)
                ctx.restore();
            }
        }
        drawHitBox();

        const drawCameraBox = () => {
            if (this.cameraBox) {
                ctx.save();
                ctx.fillStyle = "rgba(0, 0, 200, 0.45)";
                ctx.fillRect(this.cameraBoxX, this.cameraBoxY, this.cameraBoxW, this.cameraBoxH)
                ctx.restore();
            }
        }
        drawCameraBox()

        const drawBoundaryBox = () => {
            if (this.boundaryBox) {
                ctx.save();
                ctx.fillStyle = "rgba(150, 200, 0, 0.45)";
                ctx.fillRect(this.boundaryBoxX, this.boundaryBoxY, this.boundaryBoxW, this.boundaryBoxH)
                ctx.restore();
            }
        }
        drawBoundaryBox()

    }
    update() {
        const playerDirection = () => {
            if (this.moveRight && this.moveUp || 
                this.moveRight && this.moveDown ||
                this.moveRight) {
                    this.frameY = 1;
            }
            if (this.moveLeft && this.moveUp ||
                this.moveLeft && this.moveDown ||
                this.moveLeft) {
                    this.frameY = 3
            }
            if (this.moveUp &&
                !this.moveLeft &&
                !this.moveRight) {
                    this.frameY = 2;
            }
            if (this.moveDown &&
                !this.moveLeft &&
                !this.moveRight) {
                    this.frameY = 0
                }
        }
        playerDirection();

        const determineMovementDirection = () => {
            if (this.game.keys.includes('d') &&
                this.boundaryBoxRightEdge < this.game.hardBoundaries.column2X
                ) this.moveRight = true;
            else this.moveRight = false;

            if (this.game.keys.includes('a') &&
                this.boundaryBoxX > this.game.hardBoundaries.column1X+this.game.hardBoundaries.column1W
            ) this.moveLeft = true;
            else this.moveLeft = false;

            if (this.game.keys.includes('w') &&
                this.boundaryBoxY > this.game.hardBoundaries.row1Y+this.game.hardBoundaries.row1H
            ) this.moveUp = true;
            else this.moveUp = false;

            if (this.game.keys.includes('s') &&
                this.boundaryBoxBottomEdge < this.game.hardBoundaries.row2Y
            ) this.moveDown = true;
            else this.moveDown = false;
        }
        determineMovementDirection()

        // const katanaChop = () => {
        //     if (this.game.keys.includes(' ') && 

        //     )
        // }

        const playerMovement = () => {
            if (this.moveRight) this.x += this.speed;
            if (this.moveLeft) this.x -= this.speed;
            if (this.moveUp) this.y -= this.speed;
            if (this.moveDown) this.y += this.speed;
        }
        playerMovement()


        const triggerPlayerWalk = () => {
            if (this.game.keys.includes('d') ||
                this.game.keys.includes('a') ||
                this.game.keys.includes('w') ||
                this.game.keys.includes('s')) {
                    this.walk = true;
                } else {
                    this.walk = false;
                }
        }
        triggerPlayerWalk();

        const playerWalk = () => {
            if (this.walk) {
                if (gameFrame % 10 === 0) {
                    if(this.frameX < 4) {
                        this.frameX ++;} 
                    else {this.frameX = 1}
                }
            }
            if (!this.walk) {
                this.frameX = 0;
            }
        }
        playerWalk();

        const updateHitBox = () => {
            this.hitBoxW = 12;
            this.hitBoxH = 30;
        }
        updateHitBox();

        const updateCameraBox = () => {
            this.cameraBoxX = (this.x + this.w * 0.5) - this.cameraBoxW * 0.5;
            this.cameraBoxY = (this.y + this.h * 0.5) - (this.cameraBoxH * 0.5);
            this.cameraBoxRightEdge = this.cameraBoxX + this.cameraBoxW;
            this.cameraBoxBottomEdge = this.cameraBoxY + this.cameraBoxH;
        }
        updateCameraBox();

        const updateBoundaryBox = () => {
            this.boundaryBoxX = (this.x + this.w * 0.5) - (this.boundaryBoxW * 0.5);
            this.boundaryBoxY = (this.y + this.h * 0.5) - (this.boundaryBoxH * 0.35);
            this.boundaryBoxRightEdge = this.boundaryBoxX + this.boundaryBoxW;
            this.boundaryBoxBottomEdge = this.boundaryBoxY + this.boundaryBoxH;
        }
        updateBoundaryBox();

        const aimage  = () => {
            this.aim = this.game.calcAim(this.game.mouseCoordinates, this)
            // console.log(this.aim)
            // need weapon to follow path  https://www.youtube.com/watch?v=7kA9lHdukGA&t=305s 29:18
        }
        aimage()

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

        if (this.dojoLevel.moveLeft)  this.mouse.xOff -= this.player.speed;
        else if (this.dojoLevel.moveRight) this.mouse.xOff += this.player.speed;
        else this.mouse.xOff = this.mouse.xOff;

        if (this.dojoLevel.moveUp) this.mouse.yOff -= this.player.speed;
        else if (this.dojoLevel.moveDown) this.mouse.yOff += this.player.speed;
        else this.mouse.yOff = this.mouse.yOff;

        // console.log(this.mouse.xOff, this.mouse.yOff)

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
            incrementGameFrame()
            ctx.clearRect(0, 0, cnvs.width, cnvs.height);
            // ctx.drawImage(dojoSprite, 0, 0)
            game.update()
            game.draw(ctx)

        }

        requestAnimationFrame(animate)

    }
    animate(0);

})