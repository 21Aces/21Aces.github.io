//pages
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
const page6btn=document.querySelector("#page6btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
page4btn.addEventListener("click", function () {
show(4);
});
page5btn.addEventListener("click", function () {
show(5);
});
page6btn.addEventListener("click", function () {
show(6);
});
hideall()
show(1); //show first page when first opened instead of white screen








const player = document.getElementById("player");
const message = document.getElementById("message");
const time = document.getElementById("time");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const bestText = document.getElementById("best");

const sliceSound = new Audio("audio/slicesound.mp3");

// Sprite positions
const UNCUT = "-100px -112px";
const CUT = "-500px -100px";

let canDraw = false;
let roundFinished = false;
let startTime;
let timeoutID;

let score = 0;
let lives = 3;
let bestReaction = null;
let gameRunning = false;

updateHUD();

function newGame(){

    score = 0;
    lives = 3;
    bestReaction = null;

    gameRunning = true;

    updateHUD();

    startGame();

}

function startGame(){

    clearTimeout(timeoutID);

    canDraw = false;
    roundFinished = false;

    player.style.backgroundPosition = UNCUT;

    message.textContent = "Wait...";
    time.textContent = "";

    let delay = Math.random() * 3000 + 2000;

    timeoutID = setTimeout(drawSignal, delay);

}

function drawSignal(){

    message.textContent = "DRAW!";

    canDraw = true;

    startTime = Date.now();

}

function slash(){

    if(!gameRunning)
        return;

    if(roundFinished)
        return;

    if(score >= 10 || lives <= 0)
        return;

    // Too early
    if(!canDraw){

        lives--;

        updateHUD();

        message.textContent = "Too Early!";

        clearTimeout(timeoutID);

        roundFinished = true;

        if(lives <= 0){

            gameOver();

            return;

        }

        // Next round automatically
        setTimeout(function(){

            startGame();

        },1000);

        return;

    }

    // Successful cut
    canDraw = false;
    roundFinished = true;

    player.style.backgroundPosition = CUT;

    sliceSound.pause();
    sliceSound.currentTime = 0;
    sliceSound.play();

    let reaction = Date.now() - startTime;

    time.textContent = "Reaction Time: " + reaction + " ms";

    if(bestReaction === null || reaction < bestReaction){

        bestReaction = reaction;

    }

    score++;

    updateHUD();

    message.textContent = "Nice Slice!";

    if(score >= 10){

        winGame();

        return;

    }

    // Automatically begin next round
    setTimeout(function(){

        startGame();

    },1000);

}

function updateHUD(){

    scoreText.textContent = "Score: " + score;

    let hearts = "";

    for(let i = 0; i < lives; i++){

        hearts += "❤️";

    }

    livesText.textContent = "Lives: " + hearts;

    if(bestReaction == null){

        bestText.textContent = "Best Reaction: --";

    }
    else{

        bestText.textContent = "Best Reaction: " + bestReaction + " ms";

    }

}

function gameOver(){

    gameRunning = false;

    message.textContent = "☠ GAME OVER";

}

function winGame(){

    gameRunning = false;

    message.textContent = "🏆 YOU WIN!";

}

// Event Delegation
document.querySelector(".buttonContainer").addEventListener("click", function(e){

    if(e.target.id === "startBtn"){

        if(!gameRunning){

            newGame();

        }

    }

    if(e.target.id === "slashBtn"){

        slash();

    }

});

// Spacebar support
document.addEventListener("keydown", function(event){

    if(event.code === "Space"){

        event.preventDefault();

        slash();

    }

});







const btnSubmit = document.querySelector("#btnSubmit");
const SCOREBOX = document.querySelector("#SCOREBOX");

btnSubmit.addEventListener("click", CheckAns);

function CheckAns() {

    let score = 0;

    let q1 = document.querySelector("input[name='q1']:checked").value;
    if(q1 == "Japan") score++;

    let q2 = document.querySelector("input[name='q2']:checked").value;
    if(q2 == "Tamahagane") score++;

    let q3 = document.querySelector("input[name='q3']:checked").value;
    if(q3 == "Samurai") score++;

    let q4 = document.querySelector("input[name='q4']:checked").value;
    if(q4 == "Sword") score++;

    let q5 = document.querySelector("input[name='q5']:checked").value;
    if(q5 == "Martial art") score++;

    SCOREBOX.innerHTML = "Score: " + score + "/5";
}




const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);
function enterFullscreen() { //must be called by user generated event
if (document.documentElement.requestFullscreen) {
document.documentElement.requestFullscreen();
} else if (document.documentElement.mozRequestFullScreen) { // Firefox
document.documentElement.mozRequestFullScreen();
} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
document.documentElement.webkitRequestFullscreen();
} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
document.documentElement.msRequestFullscreen();
}
}
function exitFullscreen() {
if (document.exitFullscreen) {
document.exitFullscreen();
} else if (document.mozCancelFullScreen) { // Firefox
document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { // IE/Edge
document.msExitFullscreen();
}
}