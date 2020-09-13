import handleMusic from "./music"

let score = 0;
const piggyBankers = document.getElementById("pig");
const userScore = document.getElementById("user-score");
const baseCoin = document.getElementById("coin");
const coinDim = { width: 100, height: 100 };
const bomb = document.getElementById("bomb");
const bombDim = { width: 100, height: 100 };
const musicButton = document.getElementById("music-button");

const makeCoin = () => {
    const x = Math.random() * (window.innerWidth - coinDim.width);
    const y = Math.random() * (window.innerHeight - coinDim.height);
    const newCoin = baseCoin.cloneNode(true);
    newCoin.removeAttribute("id");
    newCoin.style.left = x + "px";
    newCoin.style.top = y + "px";
    newCoin.onDragStart = () => false;
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
        
        let shiftX = evt.clientX - baseCoin.getBoundingClientRect().left
        let shiftY = evt.clientY - baseCoin.getBoundingClientRect().top

        baseCoin.style.position = "absolute"
        baseCoin.style.zIndex = 1000
        document.body.append(baseCoin)

        moveAt(evt.pageX, evt.pageY)

        function moveAt(pageX, pageY) {
            baseCoin.style.left = pageX - shiftX + "px"
            baseCoin.style.top = pageY - shiftY + "px"
        }

        let currentDroppable = null
        let isOverPig = false

        function onMouseMove(evt) {
            moveAt(evt.pageX, evt.pageY)
            baseCoin.hidden = true
            let elemBelow = document.elementFromPoint(evt.clientX, evt.clientY)
            baseCoin.hidden = false

            if (!elemBelow) return

            let droppableBelow = elemBelow.closest(".droppable")

            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    isOverPig = false
                }
                currentDroppable = droppableBelow
                if (currentDroppable) {
                    isOverPig = true
                }
            }
        }

        document.addEventListener("mousemove", onMouseMove)

        baseCoin.onmouseup = function() {
            baseCoin.onmousemove = null
            baseCoin.onmouseup = null
            baseCoin.onmousedown = null

            if (isOverPig) {
                jigglePiggyBankers()
                baseCoin.remove()
                makeCoin()
                score += 100
                userScore.innerHTML = score;
            }
        }
    }
    
    baseCoin.onDragStart = function() {
        return false
    }
}

const jigglePiggyBankers = () => {
    piggyBankers.classList.add("jiggle");
    setTimeout(() => {
        piggyBankers.classList.remove("jiggle");
    }, 900)
}

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

let bombs;
const spawnBombs = () => {
    if (bombs) {
        document.getElementById("root").removeChild(bombs);
    }
    bombs = makeBombs(5)
}

const explosion = document.getElementById("explosion");
const explosionDim = { width: 850, height: 850 };
const explodeBomb = () => {
    const fart = explosion.cloneNode(true);
    fart.removeAttribute("id");
    document.getElementById("root").appendChild(fart);
};

const explodeBombs = (n) => {
    for (let i = 0; i < n; i++) {
        explodeBomb();
    };
};

const bindBombEvents = (bomb) => {
    bomb.onmousedown = function() {
        setTimeout(() => {
            explodeBomb()
        }, 1000)
    };
};


// const pause = document.getElementById("pause");
// const showPause = () => {
// 
// };

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers);
    musicButton.addEventListener("click", handleMusic);
}


const init = () => {
    makeCoins(3);
    bindEvents();
    // setInterval(() => {
    //     spawnBombs()
    // }, 2000);
    spawnBombs();
}

init()