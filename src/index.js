const baseCoin = document.getElementById("coin")
const makeCoin = () => {
    const x = Math.random() * (window.innerWidth)
    const y = Math.random() * (window.innerHeight)
    const newCoin = baseCoin.cloneNode(true);
    newCoin.removeAttribute("id")
    newCoin.classList.add("coin")
    newCoin.style.left = x + "px"
    newCoin.style.top = y + "px"
    document.getElementById("root").appendChild(newCoin)
}

const makeCoins = (n) => {
    for (let i = 0; i < n; i++) {
        makeCoin()
    }
}

const pig = document.getElementById("pig")
const jigglePiggyBankers = () => {
    pig.classList.add("jiggle")
    setTimeout(() => {
        pig.classList.remove("jiggle")
    })
}

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers)

    const draggables = document.querySelectorAll(".draggable")
    const containers = document.querySelectorAll(".container")
    
    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging")
        })
    
        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging")
        })
    })
    
    containers.forEach(container => {
        container.addEventListener("dragover", () => {
            const draggable = document.querySelector(".dragging")
            draggable.style.display = "none"
        })
    })
}

const init = () => {
    makeCoins(5)
    bindEvents()
}

init()
