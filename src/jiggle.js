const piggyBankers = document.getElementById("pig");

const jigglePiggyBankers = () => {
    piggyBankers.classList.add("jiggle");
    setTimeout(() => {
        piggyBankers.classList.remove("jiggle");
    }, 900);
};

export default jigglePiggyBankers;