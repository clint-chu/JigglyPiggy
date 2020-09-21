/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/explode.js":
/*!************************!*\
  !*** ./src/explode.js ***!
  \************************/
/*! exports provided: showExplosion, hideExplosion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showExplosion", function() { return showExplosion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideExplosion", function() { return hideExplosion; });
const explosion = document.getElementById("explosion");

const showExplosion = () => {
    explosion.classList.add("isExploded");
};

const hideExplosion = () => {
    explosion.classList.remove("isExploded");
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _explode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explode */ "./src/explode.js");
/* harmony import */ var _jiggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jiggle */ "./src/jiggle.js");

// import handlePause from "./pause";


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
                Object(_jiggle__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
    Object(_explode__WEBPACK_IMPORTED_MODULE_0__["showExplosion"])();
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
    document.addEventListener("click", _jiggle__WEBPACK_IMPORTED_MODULE_1__["default"]);
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
    Object(_explode__WEBPACK_IMPORTED_MODULE_0__["hideExplosion"])();
    // startIntervals();
    handlePause();
};

init();

/***/ }),

/***/ "./src/jiggle.js":
/*!***********************!*\
  !*** ./src/jiggle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const piggyBankers = document.getElementById("pig");

const jigglePiggyBankers = () => {
    piggyBankers.classList.add("jiggle");
    setTimeout(() => {
        piggyBankers.classList.remove("jiggle");
    }, 900);
};

/* harmony default export */ __webpack_exports__["default"] = (jigglePiggyBankers);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map