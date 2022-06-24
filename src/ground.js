'use strict'

import * as sound from './sound.js'

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
})

export class ground{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.ground = document.querySelector(".ground");
        this.groundRect = this.ground.getBoundingClientRect();
        this.onClick = this.onClick.bind(this); // => 해결방법 1번 : 직접 this 바인딩 / onClick은 클래스와 바인딩이 됨
        this.ground.addEventListener('click', (event) => this.onClick(event)); // => 해결방법 2번 : arrow function / this를 유지하기 위해 하나의 콜백을 더 감싸기
        this.ground.addEventListener('click', this.onClick); // => 해결방법 3번
        // this.ground.addEventListener('click', this.onClick); // this는 다른 콜백을 전달할 때 ground 함수 안을 벗어나면 this 클래스의 정보가 무시됨 => 해결방법 : this 바인딩
    }
    init(){
        this.ground.innerHTML = '';
        this._addItem('carrot', this.carrotCount,'img/carrot.png'); // _ : 프라이빗한 함수임을 알림
        this._addItem('bug', this.bugCount,'img/bug.png');
    }
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
    _addItem(className, count, imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.groundRect.width - CARROT_SIZE;
        const y2 = this.groundRect.height - CARROT_SIZE;
        for(let i = 0; i < count; i++){
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute'
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`
            item.style.top = `${y}px`
            this.ground.appendChild(item);
        }
    }
    onClick = (event) => { // => 해결방법 3번 : onClick을 멤버변수로 만들고
        const target = event.target;
        if(target.matches('.carrot')){
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}
