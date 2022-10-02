import { ball, player1, player2 } from './pong.js';
export class Bot {
    setParams(speed, refreshRate, bounceOffset, maxCharge) {
        (this.speed = speed), (this.refreshRate = refreshRate), (this.bounceOffset = bounceOffset), (this.maxCharge = maxCharge);
        player2.paddle.speed = this.speed;
        player2.paddle.maxCharge = this.maxCharge;
        var me = this;
        this.interval = setInterval(() => me.locateBall(), me.refreshRate);
    }
    locateBall() {
        this.targetY = ball.center.y;
        this.ballX = ball.center.x;
        this.checkIfCharge();
    }
    movePaddle() {
        if (this.speed > 30 && this.speed < ball.velocity && ball.direction.x < 0) {
            player2.paddle.y = ball.center.y - player1.paddle.height / 2;
            this.checkIfCharge();
            return;
        }
        if (this.targetY + this.speed / 2 <= player2.paddle.y + player2.paddle.height / 2) {
            player2.movePaddle(-1);
        } else if (this.targetY >= player2.paddle.y + this.speed / 2 + player2.paddle.height / 2) {
            player2.movePaddle(1);
        }
    }
    checkIfCharge() {
        if (this.ballX < player2.paddle.x - player2.paddle.width - 15) this.addCharge = true;
        else if (this.addCharge) {
            let offsetDirection = this.targetY >= player2.paddle.y + player2.paddle.height / 2 ? 1 : -1;
            for (let i = 0; i < this.bounceOffset; i++) {
                player2.movePaddle(offsetDirection);
            }
            this.addCharge = false;
        }
    }

    updatePaddleValues() {
        player2.paddle.speed = this.speed;
    }
}
