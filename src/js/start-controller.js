function start() {
    const lengthElement = document.getElementById("length");
    const sizeElement = document.getElementById("fixed-size");
    const visibleTimeElement = document.getElementById("visible-time");

    // TODO: Validation
    const length = lengthElement?.value ?? 6;
    const fixedSize = sizeElement?.checked ?? true;
    const visibleTime = visibleTimeElement?.value ?? 3;

    const config = {
        length: length,
        fixedSize: fixedSize,
        visibleTime: visibleTime
    };

    const json = JSON.stringify(config);
    window.location.href = "./play.html?config=" + encodeURI(json);
}

window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("start");
    startButton?.addEventListener("click", () => start());
});