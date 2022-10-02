import { bot, steerWithMouse } from './gamemodeChose.js';
import { hitParticles, particleHandler, resetParticles, TrailParticle, trailParticlesArr } from './particles.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.onresize = resizeCanvas;
function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    player1.setPaddleX(60);
    player2.setPaddleX(canvas.width - 80);
}
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
        this.center.y = this.position.y + this.diameter / 2;
        this.center.x = this.position.x + this.diameter;
        this.position.x += this.direction.x * this.velocity;
        this.checkColision();
        this.position.y += this.direction.y * this.velocity;
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
            hitParticles(Math.round(((player2.paddle.width / 4) * ball.velocity) / 10));
        }

        if (this.position.y <= 0 || this.position.y + this.diameter >= canvas.height) {
            if (Math.abs(this.direction.y) < 0.2) {
                this.direction.y >= 0 ? (this.direction.y = 0.3) : (this.direction.y = -0.3);
                this.position.y <= 0 ? (this.position.y = 15) : (this.position.y = canvas.height - this.diameter - 15);
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

class Player {
    constructor() {
        this.paddle = {
            width: 30,
            defaultWidth: 30,
            height: 200,
            speed: 25,
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

        if (this.paddle.origin.y <= 0) {
            this.paddle.origin.y = 0;
            return;
        }
        if (this.paddle.origin.y >= canvas.height - this.paddle.height) {
            this.paddle.origin.y = canvas.height - this.paddle.height;
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

function movePaddleByMouse(e) {
    player1.paddle.y = e.clientY - player1.paddle.height / 2;
}
const gameTicks = 1000 / 60;
export const player1 = new Player();
export const player2 = new Player();
export function gameInit() {
    player1.setSteering('w', 's', 'q');
    player1.setPaddleX(100);
    player1.setDirection('right');
    if (steerWithMouse) document.addEventListener('mousemove', movePaddleByMouse);

    if (!bot) player2.setSteering('ArrowUp', 'ArrowDown', 'ArrowRight');
    player2.setPaddleX(canvas.width - 120);
    player2.setDirection('left');
    setInterval(gameFrame, gameTicks);
}

//paddlesMovement
var keyMap = {};
document.onkeydown = onkeyup = function (e) {
    keyMap[e.key] = e.type == 'keydown';
};
function gameFrame() {
    checkPaddleMovement();
    ball.update();
    ball.checkWin();
    draw();
}

function checkPaddleMovement() {
    if (!steerWithMouse) {
        if (keyMap[player1.steering.up]) player1.movePaddle(-1);
        if (keyMap[player1.steering.down]) player1.movePaddle(1);
    }
    if (keyMap[player1.steering.chargeButton]) player1.addCharge();
    else player1.bounce();

    if (bot) {
        bot.movePaddle();
        if (bot.addCharge) player2.addCharge();
        else player2.bounce();
        return;
    }
    if (keyMap[player2.steering.up]) player2.movePaddle(-1);
    if (keyMap[player2.steering.down]) player2.movePaddle(1);
    if (keyMap[player2.steering.chargeButton]) player2.addCharge();
    else player2.bounce();
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.drawPaddle();
    player2.drawPaddle();
    ball.draw();
    particleHandler();
}

const player1Score = document.getElementById('player-1-score');
const player2Score = document.getElementById('player-2-score');
function updateScore() {
    player1Score.textContent = player1.score;
    player2Score.textContent = player2.score;
}
