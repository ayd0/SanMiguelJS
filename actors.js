import classUtils from "./classUtils.js";
const hOverrides = classUtils.hOverrides;

import { getGameFrame } from "./gameFrame.js";

const ramGirlSprite = new Image();
ramGirlSprite.src = "assets/ramGirl_x1.png";

const ninjaSprite = new Image()
ninjaSprite.src = 'assets/the_ninja_x2.png'

class Actor {
    constructor(game) {
        this.game = game;
        this.w = 64;
        this.h = 64;
        this.x = 0;
        this.y = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
        this.speed = 1;

        this.boundaryBox = true;
        this.boundaryBoxW = 20;
        this.boundaryBoxH = 46;
        this.boundaryBoxX = this.x + this.w * 0.5 - this.boundaryBoxW * 0.5;
        this.boundaryBoxY = this.y + this.h * 0.5 - this.boundaryBoxH * 0.35;
        this.boundaryBoxRightEdge = this.boundaryBoxX + this.boundaryBoxW;
        this.boundaryBoxBottomEdge = this.boundaryBoxY + this.boundaryBoxH;
    }}

class RamGirl extends Actor {
    constructor(overrides = { x: 0, y: 0 }) {
        super();
        // pos
        this.x = hOverrides(300, overrides.x);
        this.y = hOverrides(300, overrides.y);
        this.moveRight = true;

        // actions
        this.walk = false;
        this.attack = true;

        // boundaries
        this.boundaryBoxW = 40;

        // future state for idling movement, will update for random chance
        this.idling = false;
        this.idlingInterval = setInterval(() => {
            this.moveLeft = !this.moveLeft;
            this.moveRight = !this.moveRight;
        }, Math.ceil(Math.random(0, 1) * 800) + 500);
    }
    draw(ctx) {
        ctx.drawImage(
            ramGirlSprite,
            this.w * this.frameX,
            this.h * this.frameY,
            this.w,
            this.h,
            this.x,
            this.y,
            this.w,
            this.h
        );

        const drawBoundaryBox = () => {
            if (this.boundaryBox) {
                ctx.save();
                ctx.fillStyle = "rgba(150, 200, 0, 0.45)";
                ctx.fillRect(
                    this.boundaryBoxX,
                    this.boundaryBoxY,
                    this.boundaryBoxW,
                    this.boundaryBoxH
                );
                ctx.restore();
            }
        };
        drawBoundaryBox();
    }
    update() {
        const ramDirection = () => {
            if (
                (this.moveRight && this.moveUp) ||
                (this.moveRight && this.moveDown) ||
                this.moveRight
            ) {
                this.frameY = 1;
            }
            if (
                (this.moveLeft && this.moveUp) ||
                (this.moveLeft && this.moveDown) ||
                this.moveLeft
            ) {
                this.frameY = 0;
            }
            if (this.moveUp && !this.moveLeft && !this.moveRight) {
                this.frameY = 0;
            }
            if (this.moveDown && !this.moveLeft && !this.moveRight) {
                this.frameY = 1;
            }
        };
        ramDirection();

        const ramMovement = () => {
            if (this.moveRight) this.x += this.speed;
            if (this.moveLeft) this.x -= this.speed;
            if (this.moveUp) this.y -= this.speed;
            if (this.moveDown) this.y += this.speed;
        };
        ramMovement();

        const ramWalk = () => {
            if (this.walk) {
                if (getGameFrame() % 10 === 0) {
                    if (this.frameX < 4) {
                        this.frameX++;
                    } else {
                        this.frameX = 1;
                    }
                }
            }
            if (!this.walk && !this.attack) {
                this.frameX = 0;
            }
        };
        ramWalk();

        const ramAttack = () => {
            if (this.attack) {
                if (getGameFrame() % 10 === 0) {
                    if (this.frameX < 7) {
                        this.frameX++;
                    } else {
                        this.frameX = 7;
                    }
                }
            }
        };
        ramAttack();

        const updateBoundaryBox = () => {
            this.boundaryBoxX = this.x + this.w * 0.5 - this.boundaryBoxW * 0.5;
            this.boundaryBoxY =
                this.y + this.h * 0.5 - this.boundaryBoxH * 0.35;
            this.boundaryBoxRightEdge = this.boundaryBoxX + this.boundaryBoxW;
            this.boundaryBoxBottomEdge = this.boundaryBoxY + this.boundaryBoxH;
        };
        updateBoundaryBox();
    }
}
class Player extends Actor {
        constructor(game) {
            super(game);
            this.x = 200;
            this.y = 150;
            this.frameY = 1;

            this.speed = 5;

            this.hitBox = false;
            this.hitBoxX = this.x + 26;
            this.hitBoxY = this.y + 22;
            this.hitBoxW = 12;
            this.hitBoxH = 30;

            this.cameraBox = false;
            this.cameraBoxW = 400;
            this.cameraBoxH = 300;
            this.cameraBoxX = this.x + this.w * 0.5 - this.cameraBoxW * 0.5;
            this.cameraBoxY = this.y + this.h * 0.5 - this.cameraBoxH * 0.5;
            this.cameraBoxRightEdge = this.cameraBoxX + this.cameraBoxW;
            this.cameraBoxBottomEdge = this.cameraBoxY + this.cameraBoxH;

            this.boundaryBox = true;
            this.boundaryBoxW = 20;
            this.boundaryBoxH = 46;
            this.boundaryBoxX = this.x + this.w * 0.5 - this.boundaryBoxW * 0.5;
            this.boundaryBoxY = this.y + this.h * 0.5 - this.boundaryBoxH * 0.35;
            this.boundaryBoxRightEdge = this.boundaryBoxX + this.boundaryBoxW;
            this.boundaryBoxBottomEdge = this.boundaryBoxY + this.boundaryBoxH;

            this.aim;
        }
    draw(ctx) {
        const drawPlayer = () => {
            ctx.drawImage(
                ninjaSprite,
                this.w * this.frameX,
                this.h * this.frameY,
                this.w,
                this.h,
                this.x,
                this.y,
                this.w,
                this.h
            );
        };
        drawPlayer();

        const drawHitBox = () => {
            if (this.hitBox) {
                ctx.save();
                ctx.fillStyle = "rgba(100, 11, 200, 0.45)";
                ctx.fillRect(
                    this.hitBoxX,
                    this.hitBoxY,
                    this.hitBoxW,
                    this.hitBoxH
                );
                ctx.restore();
            }
        };
        drawHitBox();

        const drawCameraBox = () => {
            if (this.cameraBox) {
                ctx.save();
                ctx.fillStyle = "rgba(0, 0, 200, 0.45)";
                ctx.fillRect(
                    this.cameraBoxX,
                    this.cameraBoxY,
                    this.cameraBoxW,
                    this.cameraBoxH
                );
                ctx.restore();
            }
        };
        drawCameraBox();

        const drawBoundaryBox = () => {
            if (this.boundaryBox) {
                ctx.save();
                ctx.fillStyle = "rgba(150, 200, 0, 0.45)";
                ctx.fillRect(
                    this.boundaryBoxX,
                    this.boundaryBoxY,
                    this.boundaryBoxW,
                    this.boundaryBoxH
                );
                ctx.restore();
            }
        };
        drawBoundaryBox();
    }
    update() {
        const playerDirection = () => {
            if (
                (this.moveRight && this.moveUp) ||
                (this.moveRight && this.moveDown) ||
                this.moveRight
            ) {
                this.frameY = 1;
            }
            if (
                (this.moveLeft && this.moveUp) ||
                (this.moveLeft && this.moveDown) ||
                this.moveLeft
            ) {
                this.frameY = 3;
            }
            if (this.moveUp && !this.moveLeft && !this.moveRight) {
                this.frameY = 2;
            }
            if (this.moveDown && !this.moveLeft && !this.moveRight) {
                this.frameY = 0;
            }
        };
        playerDirection();

        const determineMovementDirection = () => {
            if (
                this.game.keys.includes("d") &&
                this.boundaryBoxRightEdge < this.game.hardBoundaries.column2X
            )
                this.moveRight = true;
            else this.moveRight = false;

            if (
                this.game.keys.includes("a") &&
                this.boundaryBoxX >
                this.game.hardBoundaries.column1X +
                this.game.hardBoundaries.column1W
            )
                this.moveLeft = true;
            else this.moveLeft = false;

            if (
                this.game.keys.includes("w") &&
                this.boundaryBoxY >
                this.game.hardBoundaries.row1Y +
                this.game.hardBoundaries.row1H
            )
                this.moveUp = true;
            else this.moveUp = false;

            if (
                this.game.keys.includes("s") &&
                this.boundaryBoxBottomEdge < this.game.hardBoundaries.row2Y
            )
                this.moveDown = true;
            else this.moveDown = false;
        };
        determineMovementDirection();

        // const katanaChop = () => {
            //     if (this.game.keys.includes(' ') &&

                //     )
                // }

        const playerMovement = () => {
            if (this.moveRight) this.x += this.speed;
            if (this.moveLeft) this.x -= this.speed;
            if (this.moveUp) this.y -= this.speed;
            if (this.moveDown) this.y += this.speed;
        };
        playerMovement();

        const triggerPlayerWalk = () => {
            if (
                this.game.keys.includes("d") ||
                this.game.keys.includes("a") ||
                this.game.keys.includes("w") ||
                this.game.keys.includes("s")
            ) {
                this.walk = true;
            } else {
                this.walk = false;
            }
        };
        triggerPlayerWalk();

        const playerWalk = () => {
            if (this.walk) {
                if (getGameFrame() % 10 === 0) {
                    if (this.frameX < 4) {
                        this.frameX++;
                    } else {
                        this.frameX = 1;
                    }
                }
            }
            if (!this.walk) {
                this.frameX = 0;
            }
        };
        playerWalk();

        const updateHitBox = () => {
            this.hitBoxW = 12;
            this.hitBoxH = 30;
        };
        updateHitBox();

        const updateCameraBox = () => {
            this.cameraBoxX = this.x + this.w * 0.5 - this.cameraBoxW * 0.5;
            this.cameraBoxY = this.y + this.h * 0.5 - this.cameraBoxH * 0.5;
            this.cameraBoxRightEdge = this.cameraBoxX + this.cameraBoxW;
            this.cameraBoxBottomEdge = this.cameraBoxY + this.cameraBoxH;
        };
        updateCameraBox();

        const updateBoundaryBox = () => {
            this.boundaryBoxX = this.x + this.w * 0.5 - this.boundaryBoxW * 0.5;
            this.boundaryBoxY =
                this.y + this.h * 0.5 - this.boundaryBoxH * 0.35;
            this.boundaryBoxRightEdge = this.boundaryBoxX + this.boundaryBoxW;
            this.boundaryBoxBottomEdge = this.boundaryBoxY + this.boundaryBoxH;
        };
        updateBoundaryBox();

        const aimage = () => {
            this.aim = this.game.calcAim(this.game.mouseCoordinates, this);
            // console.log(this.aim)
            // need weapon to follow path  https://www.youtube.com/watch?v=7kA9lHdukGA&t=305s 29:18
        };
        aimage();
    }
}

export default { RamGirl, Player };
