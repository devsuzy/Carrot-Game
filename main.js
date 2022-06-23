'use strick'

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

// 1
const ground = document.querySelector(".ground");
const groundRect = ground.getBoundingClientRect();

// 2
const gameStartBtn = document.querySelector(".play-btn");
const gameTimer = document.querySelector(".timer");
const gameScore = document.querySelector(".score");

// 4
const popUp = document.querySelector(".pop");
const popUpText = document.querySelector(".pop-text");
const popUpReplayBtn = document.querySelector(".replay-btn");

let started = false;
let score = 0;
let timer = undefined;

// 2. Game Start

gameStartBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else{
        startGame();
    }
    started = !started;
})

function startGame(){
    initGame();
    showStopGame();
    showTimeAndScore();
    startTimer();
}

// 4. Game Stop

function stopGame(){
    stopTimer();
    hidestartGame();
    showPopUpAndText('replay❓');
}

// 5. finish Game

function finishGame(win){
    hidestartGame();
    showPopUpAndText(win ? 'YOU WIN🎉`' : 'YOU LOSE💩')
}

// 2. Game Start - function

function showStopGame(){
    const icon = gameStartBtn.querySelector('.fa');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}
function showTimeAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

// 2. Game Start - function / 3. Game Start Timer

function startTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimeText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            return;
        }
        updateTimeText(--remainingTimeSec);
    }, 1000)
}

function updateTimeText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes} : ${seconds}`
}

// 4. Game Stop - function 

function stopTimer(){
    clearInterval(timer);
}
function hidestartGame(){
    gameStartBtn.style.visibility = 'hidden';
}
function showPopUpAndText(text){
    popUpText.innerText = text;
    popUp.classList.remove('hide')
}

// All. init

function initGame(){
    ground.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    addItem('carrot',CARROT_COUNT,'img/carrot.png');
    addItem('bug',BUG_COUNT,'img/bug.png');
}

// 5-1. Ground Event

ground.addEventListener('click', onGroundClick);

function onGroundClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        }
    } else if(target.matches('.bug')){
        stopTimer();
        finishGame(false);
    }
}
function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

// 5-2. PopUp Event

popUpReplayBtn.addEventListener('click', () => {
    startGame();
    hidePopUp();
})

function hidePopUp(){
    popUp.classList.add('hide')
}

// 1. Carrot, Bug Random Arrangement

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = groundRect.width - CARROT_SIZE;
    const y2 = groundRect.height - CARROT_SIZE;
    for(let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute'
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`
        item.style.top = `${y}px`
        ground.appendChild(item);
    }
}
function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}


