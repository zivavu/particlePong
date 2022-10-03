import { Bot } from './bot.js';
import { gameInit, player2 } from './pong.js';
const singlePlayerButton = document.getElementById('1-player');
const twoPlayersButton = document.getElementById('2-players');
const initScreen = document.getElementById('initial-screen');
let easy = document.createElement('button');
let medium = document.createElement('button');
let hard = document.createElement('button');
let imposible = document.createElement('button');
const buttonsArr = [easy, medium, hard, imposible];
const steerWithMouseCheckbox = document.createElement('input');
const steeringInfoContainer = document.getElementById('steering-info-container');
const player2steeringInfo = document.getElementById('player-2-info');

singlePlayerButton.onclick = appendDifficultySelectButtons;
twoPlayersButton.onclick = init2PlayersGame;

function appendDifficultySelectButtons() {
    singlePlayerButton.remove();
    twoPlayersButton.remove();
    player2steeringInfo.remove();
    easy.innerText = 'Easy';
    easy.style.backgroundColor = 'green';
    medium.innerText = 'Medium';
    medium.style.backgroundColor = 'rgb(11, 87, 87)';
    hard.innerText = 'Hard';
    hard.style.backgroundColor = 'rgb(100, 0, 0)';
    imposible.innerText = 'Imposible';
    imposible.style.backgroundColor = 'rgb(33, 33, 33)';
    buttonsArr.forEach((button) => {
        button.classList.add('difficulty-button');
        initScreen.appendChild(button);
        button.addEventListener('click', selectDifficulty);
    });
    steerWithMouseCheckbox.type = 'checkbox';
    steerWithMouseCheckbox.id = 'steer-with-mouse-checkbox';
    steerWithMouseCheckbox.checked = true;
    let steeringWithMouseLabel = document.createElement('label');
    steeringWithMouseLabel.innerText = 'Steer With Mouse';
    steeringWithMouseLabel.id = 'steer-with-mouse-label';

    initScreen.appendChild(steerWithMouseCheckbox);
    initScreen.appendChild(steeringWithMouseLabel);
}
export let steerWithMouse = true;
steerWithMouseCheckbox.addEventListener('change', steerWithMouseToggle);
function steerWithMouseToggle(e) {
    steerWithMouse = e.target.checked;
}
export let bot;
function selectDifficulty(e) {
    let difficulty = e.target.innerText;
    let speed = 0;
    let refreshRate = 0;
    let bounceOffset = 0;
    let maxCharge = 0;
    switch (difficulty) {
        case 'Easy':
            speed = 17;
            refreshRate = 90;
            maxCharge = 20;
            break;
        case 'Medium':
            speed = 21;
            refreshRate = 30;
            bounceOffset = 40;
            maxCharge = 38;
            break;
        case 'Hard':
            speed = 24;
            refreshRate = 12;
            bounceOffset = 50;
            maxCharge = 44;
            break;
        case 'Imposible':
            speed = 40;
            refreshRate = 7;
            bounceOffset = 70;
            maxCharge = 47;
            break;
    }
    bot = new Bot();
    bot.setParams(speed, refreshRate, bounceOffset, maxCharge);
    initScreen.style.visibility = 'hidden';
    steeringInfoContainer.style.visibility = 'hidden';
    document.getElementById('score-display').style.visibility = 'visible';

    gameInit();
}
function init2PlayersGame() {
    initScreen.style.visibility = 'hidden';
    steeringInfoContainer.style.visibility = 'hidden';
    document.getElementById('score-display').style.visibility = 'visible';
    gameInit();
}
