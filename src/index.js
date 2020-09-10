const baseCoin = document.getElementById("coin")
const coinDim = { width: 100, height: 100 };

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
            }
        }
    }
    
    baseCoin.onDragStart = function() {
        return false
    }
}

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

const pig = document.getElementById("pig")
const jigglePiggyBankers = () => {
    pig.classList.add("jiggle")
    setTimeout(() => {
        pig.classList.remove("jiggle")
    }, 820)
}

const bindEvents = () => {
    document.addEventListener("click", jigglePiggyBankers)
}

const init = () => {
    makeCoins(5)
    bindEvents()
}

init()