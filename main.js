'use strick'

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

// 1. carrot, bug random argement

const ground = document.querySelector(".ground");
const groundRect = ground.getBoundingClientRect();

function initGame(){
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

initGame();