import Enemy from "./Enemy.js";
import movingDiretion from "./movingDirection.js";

export default class EnemyController {

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],

    ];
    enemyRows = [];

    currentDirection = movingDiretion.right;
    xDirect = 0;
    yDirect = 0;
    defaultXDirect = 2;
    defaultYDirect = 2;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 100;
    fireBulletTimerDefault = this.fireBulletTimerDefault;


    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;

        this.enemyDeathSound = new Audio('./sounds/im-ready.mp3')
        this.enemyDeathSound.volume = 0.5;

        this.createEnemies();
    }
    draw(ctx) {
        this.decrementMoveDownTimer();
        this.updateDirectAndDiretion();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyRows.forEach(enemyRow=>{
            enemyRow.forEach((enemy,enemyIndex)=>{
                if (this.playerBulletController.collideWith(enemy)) {
                    this.enemyDeathSound.currentTime = 0;
                    this.enemyDeathSound.play();
                    enemyRow.splice(enemyIndex,1);
                }
            })
        })
        this.enemyRows = this.enemyRows.filter(enemyRow=>enemyRow.length>0);
    }

    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x, enemy.y, -3);
            console.log(enemyIndex);
        }
    }

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer() {
        if (this.currentDirection === movingDiretion.downLeft ||
            this.currentDirection === movingDiretion.downRight
        ) {
            this.moveDownTimer--;
        }
    }

    updateDirectAndDiretion() {
        for (const enemyRow of this.enemyRows) {
            if (this.currentDirection == movingDiretion.right) {
                this.xDirect = this.defaultXDirect;
                this.yDirect = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = movingDiretion.downLeft;
                    break;
                }
            } else if (this.currentDirection === movingDiretion.downLeft) {

                if (this.moveDown(movingDiretion.left)) {
                    break;
                }
            } else if (this.currentDirection === movingDiretion.left) {
                this.xDirect = - this.defaultXDirect;
                this.yDirect = 0;
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = movingDiretion.downRight;
                    break;
                }
            } else if (this.currentDirection === movingDiretion.downRight) {
                if (this.moveDown(movingDiretion.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection) {
        this.xDirect = 0;
        this.yDirect = this.defaultYDirect;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xDirect, this.yDirect);
            enemy.draw(ctx);
        })
    }

    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
                    )
                }
            })
        })
    }
    collideWith(sprite){
        return this.enemyRows.flat().some(enemy=>enemy.collideWith(sprite))
    }
}



