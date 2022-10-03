import { player1 } from './pong.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export class Player {
    constructor() {
        this.paddle = {
            width: 30,
            defaultWidth: 30,
            height: 200,
            speed: 35,
            bounceMultiplier: 1.1,
            y: canvas.height / 2,
            charge: 0,
            maxCharge: 50,
        };
        this.score = 0;
    }

    setPaddleX(paddlePosition) {
        this.paddle.x = paddlePosition;
        this.paddle.origin = {
            x: this.paddle.x,
            y: this.paddle.y,
        };
    }
    setDirection(direction) {
        this.paddle.direction = direction;
    }

    setSteering(up, down, chargeButton) {
        this.steering = {
            up: up,
            down: down,
            chargeButton: chargeButton,
        };
    }
    movePaddle(direction) {
        this.paddle.origin.y += direction * this.paddle.speed;

        if (this.paddle.origin.y < 0 - this.paddle.height / 2) {
            this.paddle.origin.y = 0 - this.paddle.height / 2;
            return;
        }
        if (this.paddle.origin.y > canvas.height - this.paddle.height / 2) {
            this.paddle.origin.y = canvas.height - this.paddle.height / 2;
            return;
        }
        this.paddle.y = this.paddle.origin.y;
    }

    addCharge() {
        if (this.paddle.charge >= this.paddle.maxCharge) {
            this.paddle.x = this.paddle.origin.x;
            return;
        }
        this.paddle.charge++;
        this.modulatePaddlePosition();
    }
    modulatePaddlePosition() {
        let tillMax = this.paddle.maxCharge - this.paddle.charge;
        this.paddle.x = this.paddle.origin.x + Math.random() * (tillMax - tillMax / 2);
    }
    bounce() {
        if (this.paddle.charge == 0) return;
        this.paddle.width = (this.paddle.width * this.paddle.charge) / 12;
        if (this.paddle.width < this.paddle.defaultWidth) this.paddle.width = this.paddle.defaultWidth;
        this.paddle.charge = 0;
        this.paddle.x = this.paddle.origin.x;
    }
    drawPaddle() {
        ctx.fillStyle = 'white';
        if (this.paddle.direction == 'left') {
            ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width * -1, this.paddle.height);
        } else {
            ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        }
        if (this.paddle.width > this.paddle.defaultWidth) this.paddle.width -= 3;
    }
}

export function movePaddleByMouse(e) {
    player1.paddle.y = e.clientY - player1.paddle.height / 2;
}
