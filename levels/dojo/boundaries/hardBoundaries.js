import { dojoSprite } from "/brains.js";

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

export default HardBoundaries