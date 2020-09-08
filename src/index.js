const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

// Create Piggy
const createPiggy = () => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
    ctx.fillRect(100, 100, 125, 125)
}

// Create Item
const createItem = () => {
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
    ctx.fillRect(300, 300, 50, 50)
}

// Create Gold Coins
const createCoin = () => {
for (let i = 0; i < 4; i++) {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight

    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2, false)
    ctx.fillStyle = "rgba(255, 215, 0)"
    ctx.fill()
}}

// Pause Game
const showPaused = () => {
    ctx.textAlign = "center"
    ctx.font = "35px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("PAUSED", width / 2, height / 2)
}

// Show Score
const showScore = () => {
    ctx.textAlign = "center"
    ctx.font = "25px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("SCORE: " + score, width-120, 30)
}

// Refresh Game
const refresh = () => {
    if (isPaused) {
        return
    }

    // If Paused Prevent Play

    // If click item, remove life

    // If deposit money, add score

    showScore()
}

window.addEventListener("keydown", (event) => {
    if (event === " ") {
        event.preventDefault()
        console.log("paused")
        isPaused = !isPaused
        showPaused()
    }
})

window.addEventListener("load", () => {
    game()
})

const game = () => {
    const tileSize = 20

    width = tileSize * Math.floor(window.innerWidth / tileSize)
    height = tileSize * Math.floor(window.innerHeight / tileSize)

    isPaused = false
    score = 0

    createItem()
    createPiggy()
    createCoin()
    refresh()
}