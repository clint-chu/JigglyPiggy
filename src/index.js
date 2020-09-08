const canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")

// Create Piggy
ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
ctx.fillRect(100, 100, 125, 125)

// Create Money
ctx.fillStyle = "rgba(0, 255, 0, 0.5)"
ctx.fillRect(300, 300, 50, 50)

// Create Gold Coins
for (let i = 0; i < 4; i++) {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight

    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2, false)
    ctx.fillStyle = "rgba(255, 215, 0)"
    ctx.fill()
    // ctx.strokeStyle = "rgba(255, 215, 0)"
    // ctx.stroke()
}





const showPaused = () => {
    ctx.textAlign = "center"
    ctx.font = "35px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("PAUSED", 200, 200)
}

const showScore = () => {
    ctx.textAlign = "center"
    ctx.font = "25px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("SCORE: " + 10, 200, 30)
}

const update = () => {
    if (isPaused) {
        return
    }
    showScore()
}

const init = () => {
    const tileSize = 20

    width = tileSize * Math.floor(window.innerWidth / tileSize);
    height = tileSize * Math.floor(window.innerHeight / tileSize);

    fps = 30

    isPaused = false
    score = 0
}

const game = () => {
    init()
    interval = setInterval(update, 1000 / fps);
}