const explosion = document.getElementById("explosion");

const explodeBomb = () => {
    const explode = explosion.cloneNode(true);
    explode.removeAttribute("id");
    document.getElementById("root").appendChild(explode);
};

export default explodeBomb;