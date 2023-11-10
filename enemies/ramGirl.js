import { gameFrame } from "/brains.js";
import { ramGirlSprite } from "/brains.js";

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

export default RamGirl