const coin = document.getElementById("coin")
const makeCoin = () => {
    const x = Math.random() * (window.innerWidth)
    const y = Math.random() * (window.innerHeight)
    const newCoin = coin.cloneNode(true)
    newCoin.removeAttribute("id")
    newCoin.style.left = x
    console.log("x1", x);
    console.log("nc-before", newCoin);
    console.log("nc-before-style", newCoin.style);
    console.log("nc-before-style-left", newCoin.style.left);
    newCoin.style.top = y
    document.getElementById("root").appendChild(newCoin)
    console.log("x2", x);
    console.log("nc-after", newCoin)
    console.log("nc-after-style", newCoin.style.left)
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
}

const init = () => {
    makeCoins(1)
    bindEvents()
}

init()

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
        container.appendChild(draggable)
    })
})