// let bombInterval;
// let counterInterval;
// let counter = 5;

// const startIntervals = () => {
//     bombInterval = setInterval(() => {
//         spawnBombs(counter);
//     }, 2000);
//     counterInterval = setInterval(() => {
//         counter++;
//     }, 10000);
// };

// const clearIntervals = () => {
//     clearInterval(bombInterval);
//     clearInterval(counterInterval);
// };

// const pauseIcon = document.getElementById("pause");

// const pauseGame = () => {
//     clearIntervals();
//     showPause();
// };

// const resumeGame = () => {
//     startIntervals();
//     hidePause();
// };

// const showPause = () => {
//     pauseIcon.classList.add("isPaused");
// };

// const hidePause = () => {
//     pauseIcon.classList.remove("isPaused");
// };

// const handlePause = () => {
//     if (isPaused) {
//         resumeGame();
//     } else {
//         pauseGame();
//     };
//     isPaused = !isPaused;
// };