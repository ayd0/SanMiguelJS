import { katanaSprite } from "/brains.js";

//tasks
// add coordinate (x, y) movement to enhance slashing
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

        this.wield = true;
        this.attack = false;
        this.slashSpeed = .5;

        this.slashDown = false;
        this.slashUp = false;
        this.slashRight = false;
        this.slashLeft = false;

        this.slashDown_EndAngle = -3.549;
        this.slashUp_EndAngle = -0.52;
        this.slashRight_EndAngle = 2.356;
        this.slashLeft_EndAngle = -2.3;


    }
    draw (ctx) {
        // rotation origin point
        ctx.save();
        ctx.translate(this.x + 30, this.y + 52);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x + 32), -(this.y + 52));
        // katana
        ctx.drawImage(katanaSprite, this.w * this.frameX, this.h * this.frameY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.restore();
    }
    update() {

        const followPlayer = () => {
            this.x = this.game.player.x;
            this.y = this.game.player.y;
        }
        followPlayer();

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
        adjustCoordinates();

        const adjustBladeDirection = () => {
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
        adjustBladeDirection();

        const adjustAngle = () => {
            if (!this.attack) {
                if (this.game.player.frameY === 0) {
                    this.angle = -20*Math.PI/180;
                } else if (this.game.player.frameY === 1) {
                    this.angle = -45*Math.PI/180;
                } else if (this.game.player.frameY === 2) {
                    this.angle = 165*Math.PI/180
                } else if (this.game.player.frameY === 3) {
                    this.angle = 45*Math.PI/180;
                } else null 
            }           
        }
        adjustAngle();

        const attack = () => {
            if (this.wield) {
                if (this.game.keys.indexOf(' ') > -1) {
                    this.attack = true;
                } else this.attack = false;
            }
        }
        attack();

        const slashDirection = () => {
            if (this.attack) {
                if (this.game.player.frameY === 0) {
                    this.slashDown = true;
                }
                if (this.game.player.frameY === 1) {
                    this.slashRight = true;
                }
                if (this.game.player.frameY === 2) {
                    this.slashUp = true;
                }
                if (this.game.player.frameY === 3) {
                    this.slashLeft = true;
                }
            } else {
                this.slashDown = false;
                this.slashRight = false;
                this.slashUp = false;
                this.slashLeft = false;
            }
        }
        slashDirection();

        const slashDown = () => {
            if (this.slashDown) {
                if (this.angle > this.slashDown_EndAngle) {
                    this.angle -= this.slashSpeed;
                }
            }
        }
        slashDown();

        const slashUp = () => {
            if (this.slashUp) {
                if (this.angle > this.slashUp_EndAngle) {
                    this.angle -= this.slashSpeed;
                }

            }
        }
        slashUp();

        const slashRight = () => {
            if (this.slashRight) {
                if (this.angle < this.slashRight_EndAngle) {
                    this.angle += this.slashSpeed;
                }

            }
        }
        slashRight();

        const slashLeft = () => {
            if (this.slashLeft) {
                if (this.angle > this.slashLeft_EndAngle) {
                this.angle -= this.slashSpeed;
                // console.log(this.angle)
                }

            }
        }
        slashLeft();

    }
}

export default PlayerKatana