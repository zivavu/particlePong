const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.onresize = resizeCanvas;
function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    player1.setPaddleX(60);
    player2.setPaddleX(canvas.width - 80);
    draw();
}
class Ball {
    constructor() {
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        this.diameter = 35;
        this.centerY = this.position.y + this.diameter / 2;
        this.velocity = 13;
        this.direction = {
            x: Math.random() > 0.5 ? 1 : -1,
            y: Math.random() * 0.8 - 0.4,
        };
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.diameter, this.diameter);
    }

    update() {
        this.checkColision();
        this.centerY = this.position.y + this.diameter / 2;
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
            this.direction.y = -(player1.paddle.y - this.centerY + player1.paddle.height / 2) / player1.paddle.height;
        }

        if (
            player2.paddle.x <= this.position.x + this.diameter &&
            player2.paddle.x >= this.position.x &&
            player2.paddle.y <= this.position.y + this.diameter &&
            player2.paddle.y + player2.paddle.height >= this.position.y
        ) {
            this.direction.x = -1;
            this.direction.y = -(player2.paddle.y - this.centerY + player2.paddle.height / 2) / player2.paddle.height;
        }

        if (this.position.y <= 0 || this.position.y + this.diameter >= canvas.height) {
            this.direction.y = -this.direction.y;
        }
    }
    checkWin() {
        if (this.position.x <= 0 || this.position.x >= canvas.width) {
            if (this.direction.x > 0) player1.score++;
            else player2.score++;
            ball = new Ball();
            updateScore();
        }
    }
}
let ball = new Ball();

class Player {
    constructor() {
        this.paddle = {
            width: 40,
            height: 200,
            velocity: 20,
            bounceMultiplier: 1.1,
            y: canvas.height / 2,
        };
        this.score = 0;
        this.charge = 0;
    }

    setPaddleX(paddlePosition) {
        this.paddle.x = paddlePosition;
    }

    setSteering(up, down, charge) {
        this.steering = {
            up: up,
            down: down,
            charge: charge,
        };
    }
    movePaddle(direction) {
        this.paddle.y += direction * this.paddle.velocity;

        this.paddle.origin = {
            x: this.paddle.x,
            y: this.paddle.y,
        };

        if (this.paddle.y <= 0) {
            this.paddle.y = 0;
            return;
        }
        if (this.paddle.y >= canvas.height - this.paddle.height) {
            this.paddle.y = canvas.height - this.paddle.height;
            return;
        }
    }
    startChargeAccumulating() {
        if (this.charge > 0) return;
        this.chargeInterval = setInterval(addCharge, gameTicks);
    }
    addCharge() {
        this.charge += 1;
        modulatePaddlePosition();
        if (this.charge > 60) bounce();
    }
    // modulatePaddlePosition(){
    //     this.paddle.x =
    // }
    bounce() {
        this.charge = 0;
    }
    drawPaddle() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width / 2, this.paddle.height);
    }
}

const gameTicks = 60 / 1000;
const player1 = new Player();
const player2 = new Player();
playersInit();
function playersInit() {
    player1.setSteering('w', 's', 'q');
    player1.setPaddleX(60);

    player2.setSteering('ArrowUp', 'ArrowDown', 'ArrowLeft');
    player2.setPaddleX(canvas.width - 80);
    draw();
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
    // ball.checkWin();
    draw();
}

function checkPaddleMovement() {
    if (keyMap[player1.steering.up]) player1.movePaddle(-1);
    if (keyMap[player1.steering.down]) player1.movePaddle(1);
    if (keyMap[player1.steering.charge]) player1.startChargeAccumulating();

    if (keyMap[player2.steering.up]) player2.movePaddle(-1);
    if (keyMap[player2.steering.down]) player2.movePaddle(1);
    if (keyMap[player2.steering.charge]) player2.startChargeAccumulating();
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.drawPaddle();
    player2.drawPaddle();
    ball.draw();
}

function updateScore() {
    scoreDisplay.textContent = `${player1.score}:${player2.score}`;
}
