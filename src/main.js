'use strict'

import popUp from './popup.js'
import * as sound from './sound.js'
import { GameBuilder, Reason } from './game.js'

// popup refactoring

const gameFinishBanner = new popUp();
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(3)
.bugCount(3)
.build()

// game refactoring

game.setGameStopListener(reason => {
    let message;
    switch(reason){
        case Reason.cancel:
            message = 'Replay❓'
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON🎉'
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST💩'
            sound.playBug();
            break;
            default:
                throw new Error ('not valid reason')
    }
    gameFinishBanner.showAndText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})