import { ball } from './ball.js';
import { bot, steerWithMouse } from './gamemodeChose.js';
import { particleHandler } from './particles.js';
import { Player, movePaddleByMouse } from './player.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.onresize = resizeCanvas;
function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    player1.setPaddleX(60);
    player2.setPaddleX(canvas.width - 80);
}

export const player1 = new Player();
export const player2 = new Player();
export function gameInit() {
    player1.setSteering('w', 's', 'r');
    player1.setPaddleX(100);
    player1.setDirection('right');
    if (steerWithMouse) document.addEventListener('mousemove', movePaddleByMouse);

    if (!bot) player2.setSteering('o', 'l', '[');
    player2.setPaddleX(canvas.width - 120);
    player2.setDirection('left');
    window.requestAnimationFrame(gameFrame);
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
    window.requestAnimationFrame(gameFrame);
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
export function updateScore() {
    player1Score.textContent = player1.score;
    player2Score.textContent = player2.score;
}
