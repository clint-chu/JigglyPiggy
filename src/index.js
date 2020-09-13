import explodeBomb from "./explode"
import handleMusic from "./music";
import jigglePiggyBankers from "./jiggle";
// import showPause from "./pause";

let score = 0;
// let isPaused = false;
const coinDim = { width: 100, height: 100 };
const baseCoin = document.getElementById("coin");
const bomb = document.getElementById("bomb");
const bombDim = { width: 100, height: 100 };
const musicButton = document.getElementById("music-button");
const restartButton = document.getElementById("restart-button");
const userScore = document.getElementById("user-score");

const makeCoin = () => {
    const x = Math.random() * (window.innerWidth - coinDim.width);
    const y = Math.random() * (window.innerHeight - coinDim.height);
    const newCoin = baseCoin.cloneNode(true);
    newCoin.removeAttribute("id");
    newCoin.style.left = x + "px";
    newCoin.style.top = y + "px";
    // newCoin.onDragStart = () => false; // What is the purpose of this?
    bindCoinEvents(newCoin);
    document.getElementById("root").appendChild(newCoin);
};

const makeCoins = (n) => {
    for (let i = 0; i < n; i++) {
        makeCoin();
    };
};

const bindCoinEvents = (baseCoin) => {
    baseCoin.onmousedown = function(evt) {
        
        let shiftX = evt.clientX - baseCoin.getBoundingClientRect().left;
        let shiftY = evt.clientY - baseCoin.getBoundingClientRect().top;

        baseCoin.style.position = "absolute";
        baseCoin.style.zIndex = 1000;
        document.body.append(baseCoin); // Why is this undefined when a coin is clicked?

        moveAt(evt.pageX, evt.pageY);

        function moveAt(pageX, pageY) {
            baseCoin.style.left = pageX - shiftX + "px";
            baseCoin.style.top = pageY - shiftY + "px";
        }

        let currentDroppable = null;
        let isOverPig = false;

        function onMouseMove(evt) {
            moveAt(evt.pageX, evt.pageY);
            baseCoin.hidden = true;
            let elemBelow = document.elementFromPoint(evt.clientX, evt.clientY);
            baseCoin.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest(".droppable");
            let bombCollision = elemBelow.closest(".bomb");

            if (droppableBelow) {
                if (currentDroppable != droppableBelow) {
                    if (currentDroppable) {
                        isOverPig = false;
                    }
                    currentDroppable = droppableBelow;
                    if (currentDroppable) {
                        isOverPig = true;
                    };
                };
            };
            
            if (bombCollision) {
                explodeBomb();
            };
        };
        
        document.addEventListener("mousemove", onMouseMove);

        baseCoin.onmouseup = function() {
            baseCoin.onmousemove = null;
            baseCoin.onmouseup = null;
            baseCoin.onmousedown = null;

            if (isOverPig) {
                jigglePiggyBankers();
                baseCoin.remove();
                makeCoin();
                score += 100;
                userScore.innerHTML = score;
            };
        };
    };
    
    // What is the purpose of this?
    // baseCoin.onDragStart = function() {
    //     return false
    // }
};

const makeBomb = () => {
    const x = Math.random() * (window.innerWidth - bombDim.width);
    const y = Math.random() * (window.innerHeight - bombDim.height);
    const newBomb = bomb.cloneNode(true);
    newBomb.removeAttribute("id");
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

let bombs; // This is undefined
const spawnBombs = () => {
    if (bombs) {
        document.getElementById("root").removeChild(bombs);
    };
    bombs = makeBombs(5);
};

const bindBombEvents = (bomb) => {
    bomb.onmousedown = function() {
        explodeBomb();
    };
};

const endGame = () => {
    console.log("endgame");
};

const restartGame = () => {
    endGame();
    init();
};

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers);
    musicButton.addEventListener("click", handleMusic);

    // window.addEventListener("keydown", (evt) => {
    //     if (evt.key === " ") {
    //         evt.preventDefault();
    //         isPaused = !isPaused;
    //         showPause();
    //     };
    // });

    restartButton.addEventListener("click", restartGame);
}

const init = () => {

    makeCoins(3);
    bindEvents();
    // setInterval(() => {
    //     spawnBombs()
    // }, 2000);
    spawnBombs();
}

init();