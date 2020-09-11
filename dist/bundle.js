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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {


const baseCoin = document.getElementById("coin")
const coinDim = { width: 100, height: 100 };

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
    }
};

let score = 0;
const userScore = document.getElementById("user-score");

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
                // score += 100
                // userScore.innerHTML = score;
            }
        }
    }
    
    baseCoin.onDragStart = function() {
        return false
    }
}

const piggyBankers = document.getElementById("pig")
const jigglePiggyBankers = () => {
    piggyBankers.classList.add("jiggle");
    setTimeout(() => {
        piggyBankers.classList.remove("jiggle");
    }, 820)
}

const bomb = document.getElementById("bomb");
const bombDim = { width: 100, height: 100 };
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
    }
};

const bindBombEvents = () => {
    document.addEventListener("click", function() {
        console.log("Oh no! PiggyBankers is gonna release one!")
    })
}

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers)
}

const init = () => {
    makeCoins(3);
    makeBombs(20);
    bindEvents();
}

init()


const fart = document.getElementById("explosion");
const showFart = () => {

};


const pause = document.getElementById("pause");
const showPause = () => {
    
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map