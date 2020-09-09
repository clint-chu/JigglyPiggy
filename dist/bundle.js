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

const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth / 1.5
canvas.height = window.innerHeight / 1.5
const ctx = canvas.getContext("2d")

// Create Piggy
const PiggyBankers = () => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
    ctx.fillRect((canvas.width-225) / 1.5, (canvas.height-225) / 1.5, 100, 100);
}

// Create Gold Coins
const createCoin = () => {
for (let i = 0; i < 4; i++) {
    const x = Math.random() * window.innerWidth / 1.5
    const y = Math.random() * window.innerHeight / 1.5

    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2, false)
    ctx.fillStyle = "rgba(255, 215, 0)"
    ctx.fill()
}}

// Create Shopping Item
const createShoppingItem = () => {
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
    ctx.fillRect(125, 125, 50, 50)
}

// Pause Game
const showPaused = () => {
    ctx.textAlign = "center"
    ctx.font = "20px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2)
}

// Show Score
const showScore = () => {
    ctx.textAlign = "center"
    ctx.font = "15px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("SCORE: " + score, canvas.width-90, 50)
}

// Initialize Game
const game = () => {
    
    width = Math.floor(window.innerWidth)
    height = Math.floor(window.innerHeight)

    isPaused = false
    score = 0

    showScore()
    PiggyBankers()
    createCoin()
    createShoppingItem()

}

window.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        event.preventDefault()
        isPaused = !isPaused
        showPaused()
    }
})

window.addEventListener("load", () => {
    game()
})


// Jiggle
    // Translate -- e.g. ctx.translate(70, 70);
    // Scale -- this ctx.scale(x, y);
    // Rotate -- this ctx.rotate(20 * Math.PI / 180);


let isDragging = false
let x = 0
let y = 0

const myCoin = document.getElementById("coin");

myCoin.addEventListener("mousedown", e => {
    x = e.offsetX
    y = e.offsetY
    isDragging = true

    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
    ctx.fillRect(x, y, 50, 50)
})

myCoin.addEventListener("mousemove", e => {
    if (isDragging === true) {
        dragCoin(ctx, x, y, e.offsetX, e.offsetY)
        x = e.offsetX
        y = e.offsetY
        console.log("test");
    }
})

window.addEventListener("mouseup", e => {
    if (isDragging === true) {
        dragCoin(ctx, x, y, e.offsetX, e.offsetY)
        x = 0
        y = 0
        isDragging = false
    }
})

const dragCoin = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map