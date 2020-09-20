import { showExplosion, hideExplosion } from "./explode";
// import handlePause from "./pause";
import jigglePiggyBankers from "./jiggle";

let score = 0;
let isPaused = false;
const coinDim = { width: 50, height: 50 };
const baseCoin = document.getElementById("coin");
const bomb = document.getElementById("bomb");
const bombDim = { width: 50, height: 50 };
const userScore = document.getElementById("user-score");
// const restartButton = document.getElementById("restart-button");

const makeCoin = () => {
    const x = Math.random() * (window.innerWidth - coinDim.width);
    const y = Math.random() * (window.innerHeight - coinDim.height);
    const newCoin = baseCoin.cloneNode(true);
    newCoin.removeAttribute("id");
    newCoin.style.left = x + "px";
    newCoin.style.top = y + "px";
    bindCoinEvents(newCoin);
    document.getElementById("root").appendChild(newCoin);
};

const makeCoins = (n) => {
    for (let i = 0; i < n; i++) {
        makeCoin();
    };
};

const bindCoinEvents = (coin) => {
    const onMouseDown = function(evt) {
        
        let shiftX = evt.clientX - coin.getBoundingClientRect().left;
        let shiftY = evt.clientY - coin.getBoundingClientRect().top;

        coin.style.position = "absolute";
        coin.style.zIndex = 1000;

        moveAt(evt.pageX, evt.pageY);

        function moveAt(pageX, pageY) {
            coin.style.left = pageX - shiftX + "px";
            coin.style.top = pageY - shiftY + "px";
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
    const x = Math.random() * (window.innerWidth - bombDim.width);
    const y = Math.random() * (window.innerHeight - bombDim.height);
    const newBomb = bomb.cloneNode(true);
    newBomb.removeAttribute("id");
    newBomb.classList.add("bomb-clone");
    newBomb.style.left = x + "px";
    newBomb.style.top = y + "px";
    bindBombEvents(newBomb);
    document.getElementById("root").appendChild(newBomb);
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

// Need to prevent clicks
const handlePause = () => {
    const pauseIcon = document.getElementById("pause");

    if (isPaused) {
        // resumeGame
        startIntervals();
        pauseIcon.classList.remove("isPaused");
    } else {
        // pauseGame
        clearIntervals();
        pauseIcon.classList.add("isPaused");
    };
    isPaused = !isPaused;
};

const handleKeydown = (event) => {
    if (event.key === " ") {
        event.preventDefault();
        handlePause();
    };
};


const musicIcon = document.getElementById("music-icon");
const musicOn = document.getElementById("music-on");
const musicOff = document.getElementById("music-off");

let musicButton = document.getElementById("music-icon");
let isPlaying = false;

const handleMusic = () => {
    if (isPlaying === false) {
        const music = document.getElementById("music");
        music.play();
        musicIcon.classList.remove("music-icon");
        musicOff.classList.add("muteMusic");
        musicButton = document.getElementsByClassName("muteMusic");
        isPlaying = true;
    } else {
        const music = document.getElementById("music");
        music.pause();
        musicOff.classList.remove("muteMusic");
        musicOn.classList.add("playMusic");
        musicButton = document.getElementsByClassName("playMusic");
        isPlaying = false;
    };
};

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers);
    document.addEventListener("keydown", handleKeydown);
    musicButton.addEventListener("click", handleMusic);
    // restartButton.addEventListener("click", restartGame);
};

const init = () => {
    makeCoins(3);
    makeBombs(5);
    bindEvents();
    hideExplosion();
    startIntervals();
};

init();