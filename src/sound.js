'use strict'

const carrotSound = new Audio('./sound/carrot_pull.mp3')
const BugSound = new Audio('./sound/bug_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')
const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')

export function playCarrot(){
    playSound(carrotSound);
}
export function playBug(){
    playSound(BugSound);
}
export function playWin(){
    playSound(winSound);
}
export function playAlert(){
    playSound(alertSound);
}
export function playBg(){
    playSound(bgSound);
}
export function stopBg(){
    stopSound(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound){
    sound.pause();
}


