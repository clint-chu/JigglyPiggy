// const CONSTANTS = {
//     piggyBankersWidth = 200,
//     piggyBankersLength = 200
// }

// const rangeX = (y) => {
//     if (y < 200 || y > (y-200)) {
//         x = window.innerWidth
//     } else {
//         if (x < (x/2 - 100)) {
//             return x = Math.floor(Math.random() * Math.floor(x/2 - 100));
//         } else {
//             return x = Math.floor(Math.random() * Math.floor(x/2 + 100));
//             // This isn't right
//         }
//     }
// }

// const rangeY = (x) => {
//     if (x < 200 || x > (x-200)) {
//         y = window.innerWidth
//     } else {
//         if (y < (y/2 - 100)) {
//             return y = Math.floor(Math.random() * Math.floor(y/2 - 100));
//         } else {
//             return y = Math.floor(Math.random() * Math.floor(y/2 + 100));
//             // This isn't right
//         }
//     }
// }

const coin = document.getElementById("coin")
const makeCoin = () => {
    const x = Math.random() * (window.innerWidth)
    const y = Math.random() * (window.innerHeight)
    const newCoin = coin.cloneNode(true)
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
            // console.log("dragstart")
            draggable.classList.add("dragging")
        })
    
        draggable.addEventListener("dragend", () => {
            // console.log("dragend")
            draggable.classList.remove("dragging")
        })
    })
    
    containers.forEach(container => {
        container.addEventListener("dragover", () => {
            const draggable = document.querySelector(".dragging")
            // draggable.style.display = "none"
        //   console.log("end", draggable.style.display);
            document.getElementById("root").remove(draggable)
        })
    })
}

const init = () => {
    makeCoins(5)
    bindEvents()
}

init()
