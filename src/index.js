const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth / 1.5
canvas.height = window.innerHeight / 1.5
const ctx = canvas.getContext("2d")

// Create Piggy
const PiggyBankers = () => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
    ctx.fillRect((canvas.width - 225) / 1.5, (canvas.height - 225) / 1.5, 100, 100);
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
    }
}

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
    ctx.fillText("SCORE: " + score, canvas.width - 90, 50)
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