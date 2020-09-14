const explosion = document.getElementById("explosion");

export const showExplosion = () => {
    explosion.classList.add("isExploded");
};

export const hideExplosion = () => {
    explosion.classList.remove("isExploded");
};