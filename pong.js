const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onresize = resizeCanvas;
function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
resizeCanvas();

class Ball {
    constructor() {
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        this.diameter = 35;
        this.velocity = 7;
        this.direction = {
            x: -1,
            y: Math.random() * 0.8 - 0.4,
        };
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.diameter, this.diameter);
    }

    update() {
        this.checkColision();
        this.position.x += this.direction.x * this.velocity;
        this.position.y += this.direction.y * this.velocity;
    }
    checkColision() {
        if (
            player1.paddle.x >= this.position.x - player1.paddle.width / 2 &&
            player1.paddle.x <= this.position.x &&
            player1.paddle.y <= this.position.y + this.diameter &&
            player1.paddle.y + player1.paddle.height >= this.position.y
        ) {
            this.direction.x = 1;
        }
        if (
            player2.paddle.x <= this.position.x + this.diameter &&
            player2.paddle.x >= this.position.x &&
            player2.paddle.y <= this.position.y + this.diameter &&
            player2.paddle.y + player2.paddle.height >= this.position.y
        ) {
            this.direction.x = -1;
        }
        if (this.position.y <= 0 || this.position.y + this.diameter >= canvas.height) this.direction.y = -this.direction.y;
    }
}
const ball = new Ball();

class Player {
    constructor() {
        this.paddle = {
            width: 40,
            height: 200,
            velocity: 10,
            bounceMultiplier: 1.1,
            y: canvas.height / 2,
        };
    }

    setPaddlePosition(paddlePosition) {
        this.paddle.x = paddlePosition;
    }

    setSteering(up, down) {
        this.steering = {
            up: up,
            down: down,
        };
    }
    movePaddle(direction) {
        if (this.paddle.y < 0) {
            this.paddle.y = 0;
            return;
        }
        if (this.paddle.y > canvas.height - this.paddle.height) {
            this.paddle.y = canvas.height - this.paddle.height;
            return;
        }
        this.paddle.y += direction * this.paddle.velocity;
    }
    drawPaddle() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width / 2, this.paddle.height);
    }
}

const player1 = new Player();
const player2 = new Player();
const players = [player1, player2];
playersInit();
function playersInit() {
    player1.setSteering('w', 's');
    player1.setPaddlePosition(60);
    player1.drawPaddle();

    player2.setSteering('ArrowUp', 'ArrowDown');
    player2.setPaddlePosition(canvas.width - 80);
    player2.drawPaddle();

    setInterval(gameFrame, 60 / 1000);
}

//paddlesMovement
var keyMap = {};
document.onkeydown = onkeyup = function (e) {
    keyMap[e.key] = e.type == 'keydown';
};
function gameFrame() {
    ball.update();
    checkPaddleMovement();
    draw();
}

function checkPaddleMovement() {
    if (keyMap[player1.steering.up]) player1.movePaddle(-1);
    if (keyMap[player1.steering.down]) player1.movePaddle(1);
    if (keyMap[player2.steering.up]) player2.movePaddle(-1);
    if (keyMap[player2.steering.down]) player2.movePaddle(1);
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.drawPaddle();
    player2.drawPaddle();
    ball.draw();
}
