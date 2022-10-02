import { Bot } from './bot.js';
import { gameInit } from './pong.js';
const singlePlayerButton = document.getElementById('1-player');
const twoPlayersButton = document.getElementById('2-players');
const initScreen = document.getElementById('initial-screen');
let easy = document.createElement('button');
let medium = document.createElement('button');
let hard = document.createElement('button');
let imposible = document.createElement('button');
const buttonsArr = [easy, medium, hard, imposible];
const steerWithMouseCheckbox = document.createElement('input');

singlePlayerButton.onclick = appendDifficultySelectButtons;
twoPlayersButton.onclick = init2PlayersGame;

function appendDifficultySelectButtons() {
    singlePlayerButton.remove();
    twoPlayersButton.remove();
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
    steerWithMouseCheckbox.checked = false;
    let steeringWithMouseLabel = document.createElement('label');
    steeringWithMouseLabel.innerText = 'Steer With Mouse';
    initScreen.appendChild(steerWithMouseCheckbox);
    initScreen.appendChild(steeringWithMouseLabel);
}
export let steerWithMouse = false;
steerWithMouseCheckbox.addEventListener('change', steerWithMouseToggle);
function steerWithMouseToggle(e) {
    steerWithMouse = e.target.checked;
}
export let bot;
function selectDifficulty(e) {
    let difficulty = e.target.innerText;
    let speed = 0;
    let refreshRate = 0;
    let randomOffset = 0;
    switch (difficulty) {
        case 'Easy':
            speed = 17;
            refreshRate = 90;
            break;
        case 'Medium':
            speed = 14;
            refreshRate = 40;
            randomOffset = 3;
            break;
        case 'Hard':
            speed = 22;
            refreshRate = 14;
            randomOffset = 5;
            break;
        case 'Imposible':
            speed = 45;
            refreshRate = 8;
            randomOffset = 3;
            break;
    }
    bot = new Bot();
    bot.setParams(speed, refreshRate, randomOffset);
    initScreen.style.visibility = 'hidden';
    document.getElementById('score-display').style.visibility = 'visible';

    gameInit();
}
function init2PlayersGame() {
    initScreen.style.visibility = 'hidden';
    document.getElementById('score-display').style.visibility = 'visible';
    gameInit();
}
