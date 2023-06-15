export default class Player {

    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, Direct, bulletController) {
        this.canvas = canvas;
        this.Direct = Direct;
        this.bulletController = bulletController;
        this.x = this.canvas.width / 2.5;
        this.y = this.canvas.height - 140;
        this.bulletx = this.x;
        this.bullety = this.y;
        this.width = 200;
        this.height = 130;
        this.image = new Image();
        this.image.src = "./images/spongebob.png";

        document.addEventListener("keydown", this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width, this.y, 4, 10);
        }
        this.move();
        this.withWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    withWalls() {
        //left
        if (this.x < 0) {
            this.x = 0;
        }
        //right
        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
    }


    move() {
        if (this.rightPressed) {
            this.x += this.Direct;
        } else if (this.leftPressed) {
            this.x += -this.Direct;
        }
    }


    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
        if (event.code == "Space") {
            this.shootPressed = true;

        }
    }
    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
        if (event.code == "Space") {
            this.shootPressed = false;

        }
    }
};
