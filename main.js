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

let started = false;
let timer = 0;
let score = undefined;

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

function showStopGame(){
    const icon = gameStartBtn.querySelector('.fa');
    icon.classList.add('.fa-stop');
    icon.classList.remove('.fa-play');
}
function showTimeAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

// 3. Start Timer

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

// 1. Carrot, Bug Random Arrangement

function initGame(){
    ground.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    addItem('carrot',CARROT_COUNT,'img/carrot.png');
    addItem('bug',BUG_COUNT,'img/bug.png');
}

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


