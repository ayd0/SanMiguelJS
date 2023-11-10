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

export default ScrollBoundaries