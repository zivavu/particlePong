import { ball, player2 } from './pong.js';
let selectedDifficulty = 1;
export class Bot {
    constructor() {
        (this.difficulty = selectedDifficulty), (this.speed = 8), (this.updateRate = 400);
    }
    locateBall() {
        this.targetY = ball.centerY;
    }
    movePaddle() {
        this.locateBall();
        if (this.targetY + this.speed <= player2.paddle.y + player2.paddle.height / 2) {
            console.log(this.targetY, player2.paddle.y);
            player2.movePaddle(-1);
        } else if (this.targetY >= player2.paddle.y + this.speed + player2.paddle.height / 2) {
            player2.movePaddle(1);
        }
    }
    updatePaddleValues() {
        player2.paddle.speed = this.speed;
    }
}
export let easy = new Bot();
