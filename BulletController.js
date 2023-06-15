import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtAtime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtAtime = maxBulletsAtAtime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("./sounds/bullet.mp3");
        this.shootSound.volume = 0.5;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);


        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(Sprite) {
        this.bulletThatHitSpriteIndex = this.bullets.findIndex(bullet => bullet.collideWith(Sprite));
        if (this.bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(this.bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    }

    shoot(x, y, Direct, timeTillNextBulletAllowed = 0) {
        if (this.timeTillNextBulletAllowed <= 0 &&
            this.bullets.length < this.maxBulletsAtAtime
        ) {
            const bullet = new Bullet(this.canvas, x, y, Direct, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();

            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}