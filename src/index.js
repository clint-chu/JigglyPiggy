import { showExplosion, hideExplosion } from "./explode";
// import handlePause from "./pause";
import jigglePiggyBankers from "./jiggle";

let score = 0;
const board = document.getElementById("board")
const coinDim = { width: 40, height: 40 };
const baseCoin = document.getElementById("coin");
const bomb = document.getElementById("bomb");
const bombDim = { width: 80, height: 80 };
const userScore = document.getElementById("user-score");
// const restartButton = document.getElementById("restart-button");

const makeCoin = () => {
    const x = Math.random() * (800 - coinDim.width);
    const y = Math.random() * (600 - coinDim.height);
    const newCoin = baseCoin.cloneNode(true);
    newCoin.removeAttribute("id");
    newCoin.style.left = x + "px";
    newCoin.style.top = y + "px";
    bindCoinEvents(newCoin);
    board.appendChild(newCoin);
};

const makeCoins = (n) => {
    for (let i = 0; i < n; i++) {
        makeCoin();
    };
};

const bindCoinEvents = (coin) => {
    const onMouseDown = function(evt) {
        
        let shiftX = evt.clientX - coin.getBoundingClientRect().left + board.getBoundingClientRect().left;
        let shiftY = evt.clientY - coin.getBoundingClientRect().top + board.getBoundingClientRect().top;

        coin.style.position = "absolute";
        coin.style.zIndex = 1000;

        moveAt(evt.pageX, evt.pageY);

        function moveAt(pageX, pageY) {
            let x = pageX - shiftX
            let y = pageY - shiftY

            x = x < 0 ? 0
                : x > 800 - coinDim.width ? 800 - coinDim.width
                : x;

            y = y < 0 ? 0
                : y > 600 - coinDim.height ? 600 - coinDim.height
                : y;

            coin.style.left = x + "px";
            coin.style.top = y + "px";
        };

        let currentDroppable = null;
        let isOverPig = false;

        function onMouseMove(evt) {
            moveAt(evt.pageX, evt.pageY);
            coin.hidden = true;
            let elemBelow = document.elementFromPoint(evt.clientX, evt.clientY);
            coin.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest(".droppable");
            let bombCollision = elemBelow.closest(".bomb");

            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    isOverPig = false;
                };

                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    isOverPig = true;
                };
            };

            let isOverBoard = !elemBelow.closest("#board");

            if (isOverBoard) {
                onMouseUp();
            };
            
            if (bombCollision) {
                endGame();
            };
        };

        const onMouseUp = function() {
            document.removeEventListener("mousemove", onMouseMove);
            
            if (isOverPig) {
                jigglePiggyBankers();
                coin.removeEventListener("mouseup", onMouseUp);
                coin.removeEventListener("mousedown", onMouseDown);
                coin.removeEventListener("dragstart", onDragStart);
                coin.remove();
                makeCoin();
                score += 100;
                userScore.innerHTML = score;
            };
        };

        document.addEventListener("mousemove", onMouseMove);
        coin.addEventListener("mouseup", onMouseUp);
    };
    
    // Don't do anything on start of drag. Stop the browser from doing anything else.
    const onDragStart = () => false;
    
    coin.addEventListener("dragstart", onDragStart);
    coin.addEventListener("mousedown", onMouseDown);
};

const makeBomb = () => {
    const x = Math.random() * (800 - bombDim.width);
    const y = Math.random() * (600 - bombDim.height);
    const newBomb = bomb.cloneNode(true);
    newBomb.removeAttribute("id");
    newBomb.classList.add("bomb-clone");
    newBomb.style.left = x + "px";
    newBomb.style.top = y + "px";
    bindBombEvents(newBomb);
    board.appendChild(newBomb);
};

const makeBombs = (n) => {
    for (let i = 0; i < n; i++) {
        makeBomb();
    };
};

const deleteBomb = (bomb) => {
    bomb.removeEventListener("mousedown", endGame);
    bomb.remove();
};

const deleteBombs = () => {
    const bombs = document.getElementsByClassName("bomb-clone");
    while (bombs.length) {
        deleteBomb(bombs[0]);
    };
};

const spawnBombs = (n) => {
    deleteBombs();
    makeBombs(n);
};

const bindBombEvents = (bomb) => {
    bomb.addEventListener("mousedown", endGame);
};

const endGame = () => {
    showExplosion();
    clearIntervals();
};

// const restartGame = () => {
//     endGame();
//     hidePause();
//     init();
// };

let bombInterval;
let counterInterval;
let counter = 5;
let isPaused = false;
const menu = document.getElementById("menu")

const startIntervals = () => {
    bombInterval = setInterval(() => {
        spawnBombs(counter);
    }, 2000);
    counterInterval = setInterval(() => {
        counter++;
    }, 10000);
};

const clearIntervals = () => {
    clearInterval(bombInterval);
    clearInterval(counterInterval);
};

const handlePause = () => {

    if (isPaused) {
        // resumeGame
        startIntervals();
        menu.classList.remove("isPaused");
    } else {
        // pauseGame
        clearIntervals();
        menu.classList.add("isPaused");
    };
    isPaused = !isPaused;
};

const handleKeydown = (event) => {
    if (event.key === " ") {
        event.preventDefault();
        handlePause();
    };
};

let isPlaying = false;
const musicPlaying = document.getElementById("music-playing");
const musicMuted = document.getElementById("music-muted");

const handleMusic = () => {
    const music = document.getElementById("music");
    
    if (isPlaying === false) {
        music.play();
        menu.classList.add("isPlaying");
    } else {
        music.pause();
        menu.classList.remove("isPlaying");
    };
    isPlaying = !isPlaying;
};

let isDisplayed = false;
const instructionsButton = document.getElementById("instructions-button");

const handleInstructions = () => {
    const instructions = document.getElementById("instructions-window")

    if (isDisplayed === false) {
        instructions.classList.add("isDisplayed")
    } else {
        instructions.classList.remove("isDisplayed");
    }
    isDisplayed = !isDisplayed;
}

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers);
    document.addEventListener("keydown", handleKeydown);

    musicPlaying.addEventListener("click", handleMusic);
    musicMuted.addEventListener("click", handleMusic);
    instructionsButton.addEventListener("click", handleInstructions);
    // restartButton.addEventListener("click", restartGame);
};

const init = () => {
    makeCoins(3);
    makeBombs(5);
    bindEvents();
    hideExplosion();
    // startIntervals();
    handlePause();
};

init();