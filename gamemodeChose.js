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
    medium.innerText = 'Medium';
    hard.innerText = 'Hard';
    imposible.innerText = 'Imposible';
    buttonsArr.forEach((button) => {
        button.classList.add('difficulty-button');
        initScreen.appendChild(button);
        button.addEventListener('click', selectDifficulty);
    });
}
export let bot;
function selectDifficulty(e) {
    let difficulty = e.target.innerText;
    let difficultyNum = 1;
    switch (difficulty) {
        case 'Easy':
            difficultyNum = 1;
            break;
        case 'Medium':
            difficultyNum = 1.5;
            break;
        case 'Hard':
            difficultyNum = 3;
            break;
        case 'Imposible':
            difficultyNum = 6;
            break;
    }
    bot = new Bot();
    bot.setParams(difficultyNum);
    initScreen.style.visibility = 'hidden';
    gameInit();
}
function init2PlayersGame() {
    initScreen.style.visibility = 'hidden';
    gameInit();
}
