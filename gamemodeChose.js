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

singlePlayerButton.onclick = appendDifficultySelectButtons;
twoPlayersButton.onclick = init2PlayersGame;

function appendDifficultySelectButtons() {
    singlePlayerButton.remove();
    twoPlayersButton.remove();
    easy.innerText = 'Easy';
    easy.style.backgroundColor = 'limegreen';
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
}
export let bot;
function selectDifficulty(e) {
    let difficulty = e.target.innerText;
    let speed = 0;
    let refreshRate = 0;
    switch (difficulty) {
        case 'Easy':
            speed = 8;
            refreshRate = 90;
            break;
        case 'Medium':
            speed = 12;
            refreshRate = 60;
            break;
        case 'Hard':
            speed = 16;
            refreshRate = 40;
            break;
        case 'Imposible':
            speed = 30;
            refreshRate = 10;
            break;
    }
    bot = new Bot();
    bot.setParams(speed, refreshRate);
    initScreen.style.visibility = 'hidden';
    gameInit();
}
function init2PlayersGame() {
    initScreen.style.visibility = 'hidden';
    gameInit();
}
