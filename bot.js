import { ball, player2 } from './pong.js';
export class Bot {
    setParams(speed, refreshRate) {
        (this.speed = speed), (this.refreshRate = refreshRate);
        player2.paddle.speed = this.speed;
        var me = this;
        this.interval = setInterval(() => me.locateBall(), me.refreshRate);
    }
    locateBall() {
        this.targetY = ball.center.y;
        this.ballX = ball.center.x;
        this.checkIfCharge();
    }
    movePaddle() {
        if (this.targetY + this.speed / 2 <= player2.paddle.y + player2.paddle.height / 2) {
            player2.movePaddle(-1);
        } else if (this.targetY >= player2.paddle.y + this.speed / 2 + player2.paddle.height / 2) {
            player2.movePaddle(1);
        }
    }
    checkIfCharge() {
        if (this.ballX < player2.paddle.x - player2.paddle.width) this.addCharge = true;
        else this.addCharge = false;
    }

    updatePaddleValues() {
        player2.paddle.speed = this.speed;
    }
}
