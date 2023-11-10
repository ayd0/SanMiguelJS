import { dojoSprite } from "/brains.js";

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

export default DojoLevel