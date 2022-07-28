score = 0;
cross = true;
f=true;
audio = new Audio('music/music.mp3');
audiogo = new Audio('music/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 5000);
document.onkeydown = function (e) {
    // console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38 || e.keyCode ==87 || e.keyCode ==119) {
        drago = document.querySelector('.drago');
        drago.classList.add('animateDrago');
        setTimeout(() => {
            drago.classList.remove('animateDrago')
        }, 700);
    }
    if (e.keyCode == 39 || e.keyCode ==68 || e.keyCode ==100) {
        drago = document.querySelector('.drago');
        dragoX = parseInt(window.getComputedStyle(drago, null).getPropertyValue('left'));
        if(!(dragoX+312>=1250))
            drago.style.left = dragoX + 312 + "px";
    }
    if (e.keyCode == 37 || e.keyCode ==65 || e.keyCode ==97) {
        drago = document.querySelector('.drago');
        dragoX = parseInt(window.getComputedStyle(drago, null).getPropertyValue('left'));
        if(!(dragoX-112<=0))
        drago.style.left = (dragoX - 112) + "px";
    }
}

setInterval(() => {
    drago = document.querySelector('.drago');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(drago, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(drago, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 142) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        drago.classList.remove('animateDrago')
        audiogo.play();
        f=false;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross&& f) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}