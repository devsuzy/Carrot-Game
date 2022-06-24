'use strict'

import { ground, ItemType } from './ground.js'
import * as sound from './sound.js'

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
}) // 문자열을 이용해서 타입 만들기 안에 지정된 오브젝트 멤버만 쓸 수 있도록 지정

// Bulider Pattern
export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }
    carrotCount(num){
        this.carrotCount = num;
        return this;
    }
    bugCount(num){
        this.bugCount = num;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameStartBtn = document.querySelector(".play-btn");
        this.gameTimer = document.querySelector(".timer");
        this.gameScore = document.querySelector(".score");

        this.gameStartBtn.addEventListener('click', () => {
            if(this.started){
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });

        this.gameGround = new ground(carrotCount, bugCount);
        this.gameGround.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }
        setGameStopListener(onGameStop){
            this.onGameStop = onGameStop;
        }
        start() {
            this.started = true;
            this.initGame();
            this.showStopGame();
            this.showTimeAndScore();
            this.startTimer();
            sound.playBg();
        }
        
        stop(reason) {
            this.started = false;
            this.stopTimer();
            this.hidestartGame();
            sound.stopBg();
            this.onGameStop && this.onGameStop(reason);
        }

        onItemClick = item => {
            if(!this.started){
                return;
            }
            if(item === ItemType.carrot){
                this.score++;
                this.updateScoreBoard();
                if(this.score === this.carrotCount){
                    this.stop(Reason.win);
                }
            } else if(item === ItemType.bug){
                this.stop(Reason.lose);
            }
        };

    showStopGame(){
        const icon = this.gameStartBtn.querySelector('.fa');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameStartBtn.style.visibility = 'visible';
    }
    showTimeAndScore(){
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimeText(remainingTimeSec);
        this.timer = setInterval(() => {
            if(remainingTimeSec <= 0){
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose)
                return;
            }
            this.updateTimeText(--remainingTimeSec);
        }, 1000)
    }
    
    updateTimeText(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes} : ${seconds}`
    }
    
    stopTimer(){
        clearInterval(this.timer);
    }
    hidestartGame(){
        this.gameStartBtn.style.visibility = 'hidden';
    }
    
    initGame(){
        this.score = 0;
        this.gameScore.innerHTML = this.carrotCount;
        this.gameGround.init();
    }
    
    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
}