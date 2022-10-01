import { ball, player2 } from './pong.js';
export class Bot {
    setParams(difficulty) {
        (this.speed = 8 * difficulty), (this.updateRate = 400 / difficulty);
        player2.paddle.speed = this.speed;
    }
    locateBall() {
        this.targetY = ball.centerY;
    }
    movePaddle() {
        this.locateBall();
        if (this.targetY + this.speed <= player2.paddle.y + player2.paddle.height / 2) {
            player2.movePaddle(-1);
        } else if (this.targetY >= player2.paddle.y + this.speed + player2.paddle.height / 2) {
            player2.movePaddle(1);
        }
    }
    updatePaddleValues() {
        player2.paddle.speed = this.speed;
    }
}
