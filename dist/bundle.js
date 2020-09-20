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
/* harmony import */ var _music__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music */ "./src/music.js");
/* harmony import */ var _jiggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jiggle */ "./src/jiggle.js");




let score = 0;
let isPaused = false;
const coinDim = { width: 100, height: 100 };
const baseCoin = document.getElementById("coin");
const bomb = document.getElementById("bomb");
const bombDim = { width: 100, height: 100 };
const musicButton = document.getElementById("music-button");
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
                Object(_jiggle__WEBPACK_IMPORTED_MODULE_2__["default"])();
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
    Object(_explode__WEBPACK_IMPORTED_MODULE_0__["showExplosion"])();
    clearIntervals();
};

// const restartGame = () => {
//     endGame();
//     hidePause();
//     init();
// };

const pauseIcon = document.getElementById("pause");

let bombInterval;
let counterInterval;
const pauseGame = () => {
    clearIntervals();
    showPause();
};

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

const resumeGame = () => {
    startIntervals();
    hidePause();
};

const showPause = () => {
    pauseIcon.classList.add("isPaused");
};

const hidePause = () => {
    pauseIcon.classList.remove("isPaused");
};

const handleKeydown = (event) => {
    if (event.key === " ") {
        event.preventDefault();
        handleSpacebar();
    };
};

const handleSpacebar = () => {
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    };
    isPaused = !isPaused;
};

const bindEvents = () => {
    document.addEventListener("click", _jiggle__WEBPACK_IMPORTED_MODULE_2__["default"]);
    document.addEventListener("keydown", handleKeydown);
    // musicButton.addEventListener("click", handleMusic);
    // restartButton.addEventListener("click", restartGame);
};


const init = () => {
    makeCoins(3);
    makeBombs(5);
    bindEvents();
    Object(_explode__WEBPACK_IMPORTED_MODULE_0__["hideExplosion"])();
    startIntervals();
}

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

/***/ }),

/***/ "./src/music.js":
/*!**********************!*\
  !*** ./src/music.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const handleMusic = () => {
    const musicButton = document.getElementById("music-button");

    if (musicButton.classList.contains("music-off")) {
        music.play();
        musicButton.classList.remove("music-off");
        musicButton.classList.add("music-on");
        musicButton.innerHTML = "Music: On";
    } else if (musicButton.classList.contains("music-on")) {
        music.pause();
        musicButton.classList.remove("music-on");
        musicButton.classList.add("music-off");
        musicButton.innerHTML = "Music: Off";
    };
};

/* harmony default export */ __webpack_exports__["default"] = (handleMusic);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map