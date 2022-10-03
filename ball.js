import { hitParticles, resetParticles, TrailParticle, trailParticlesArr } from './particles.js';
import { player1, player2, updateScore } from './pong.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class Ball {
    constructor() {
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        this.diameter = 40;
        this.center = {
            x: this.position.x + this.diameter / 2,
            y: this.position.y + this.diameter / 2,
        };
        this.velocity = 10;
        this.direction = {
            x: Math.random() > 0.5 ? 1 : -1,
            y: Math.random() * 0.4 - 0.2,
        };
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.diameter, this.diameter);
    }

    update() {
        this.position.x += this.direction.x * this.velocity;
        this.position.y += this.direction.y * this.velocity;
        this.center.y = this.position.y + this.diameter / 2;
        this.center.x = this.position.x + this.diameter;
        this.checkColision();
        trailParticlesArr.push(new TrailParticle());
    }

    checkColision() {
        if (
            player1.paddle.x + player1.paddle.width >= this.position.x &&
            player1.paddle.x <= this.position.x + this.diameter &&
            player1.paddle.y <= this.position.y + this.diameter &&
            player1.paddle.y + player1.paddle.height >= this.position.y
        ) {
            this.direction.x = 1;
            this.direction.y = (-(player1.paddle.y - this.center.y + player1.paddle.height / 2) * 1.6) / player1.paddle.height;
            this.velocity = (this.velocity * player1.paddle.width) / (player1.paddle.defaultWidth * 3);
            if (this.velocity <= 20) this.velocity = 20;
            if (this.velocity > 65) this.velocity = 65;

            hitParticles(Math.round(((player1.paddle.width / 4) * ball.velocity) / 10));
        }

        if (
            player2.paddle.x - player2.paddle.width <= this.position.x + this.diameter &&
            player2.paddle.x >= this.position.x &&
            player2.paddle.y <= this.position.y + this.diameter &&
            player2.paddle.y + player2.paddle.height >= this.position.y
        ) {
            this.direction.x = -1;
            this.direction.y = (-(player2.paddle.y - this.center.y + player2.paddle.height / 2) * 1.6) / player2.paddle.height;
            this.velocity = (this.velocity * player2.paddle.width) / (player2.paddle.defaultWidth * 3);
            if (this.velocity <= 20) this.velocity = 20;
            if (this.velocity > 65) this.velocity = 65;
            hitParticles(Math.round(((player2.paddle.width / 4) * ball.velocity) / 10));
        }
        if (this.position.y <= 0 || this.position.y + this.diameter >= canvas.height) {
            if (Math.abs(this.direction.y) < 0.2) {
                this.direction.y >= 0 ? (this.direction.y = 0.4) : (this.direction.y = -0.4);
                this.position.y <= 0 ? (this.position.y = 20) : (this.position.y = canvas.height - this.diameter - 20);
            }
            this.direction.y = -this.direction.y;
            hitParticles(Math.round(ball.velocity));
        }
    }
    checkWin() {
        if (this.position.x <= 0 || this.position.x >= canvas.width) {
            if (this.direction.x > 0) player1.score++;
            else player2.score++;
            ball = new Ball();
            resetParticles();
            updateScore();
        }
    }
}

export let ball = new Ball();
