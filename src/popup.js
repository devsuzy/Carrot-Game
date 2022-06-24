'use strict'

// 바깥으로 노출
export default class popUp{ 
    constructor(){ // 초기화
        this.popUp = document.querySelector(".pop");
        this.popUpText = document.querySelector(".pop-text");
        this.popUpReplayBtn = document.querySelector(".replay-btn");
        this.popUpReplayBtn.addEventListener('click', () => {
            this.onClick && this.onClick()
            this.hide();
        })
    }
    setClickListener(onClick){
        this.onClick = onClick;
    }
    showAndText(text){
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-hide')
    }
    hide(){
        this.popUp.classList.add('pop-hide')
    }
}

