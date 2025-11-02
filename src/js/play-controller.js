/**
 * @type any
 */
let config;
let score = 0;
let gameOver = false;
let numberVisible = true;
let numberValue = "0"; // string for easier comparison

function loadConfig() {
    const data = decodeURI(window.location.href.split("?config=")[1]);
    config = JSON.parse(data);

    // Make sure this is actually an int
    config.length = parseInt(config.length);
    config.visibleTime = parseInt(config.visibleTime);

    if (window.location.href.indexOf("127.0.0.1")) {
        // This is nice to know (in local builds)
        console.log(config);
    }
}

/**
 * @param {boolean} showNumber
 */
function toggleVisibility(showNumber) {
    const number = document.getElementById("number");
    const input = document.getElementById("number-input");

    numberVisible = showNumber;
    if (showNumber) {
        number.style.visibility = "visible";
        input.style.visibility = "hidden";
    } else {
        number.style.visibility = "hidden";
        input.style.visibility = "visible";
    }
}

function generateNumber() {
    let string = "";
    if (config.fixedSize) {
        for (let i = 1; i <= config.length; i++) {
            string += Math.floor(Math.random() * 10);
        }
    } else {
        string = Math.floor(Math.random() * 10 * config.length).toString();
    }

    return string;
}

function setNumber() {
    const number = document.getElementById("number");
    numberValue = generateNumber();
    number.innerHTML = numberValue;
}

function setScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "Score: " + score;
}

function runGameRound() {
    setScore();
    toggleVisibility(true);
    setNumber();
    setTimeout(() => {
        toggleVisibility(false);
    }, config.visibleTime * 1000);
}

function fail() {
    gameOver = true;

    const confirmElement = document.getElementById("confirm");
    const gameArea = document.getElementById("game-area");

    confirmElement.value = "Menu";
    gameArea.style.display = "none";
}

function returnToMenu() {
    const json = JSON.stringify(config);
    window.location.href = "./index.html?config=" + encodeURI(json);
}

function confirm() {

    if (gameOver) {
        returnToMenu();
    }

    const input = document.getElementById("number-input");
    const guess = input?.value;

    // Remember to clear the input!
    input.value = "";
    if (numberValue === guess) {
        score++;
        runGameRound();
    } else {
        fail();
    }
}

window.addEventListener('keypress', (e) => {
    if (e.key !== "Enter" || numberVisible) {
        return;
    }

    confirm();
});

window.addEventListener('DOMContentLoaded', () => {
    const confirmElement = document.getElementById("confirm");
    confirmElement?.addEventListener("click", () => confirm());

    loadConfig();
    runGameRound();
});
