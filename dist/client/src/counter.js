"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCounter = setupCounter;
function setupCounter(element) {
    let counter = 0;
    const setCounter = (count) => {
        counter = count;
        element.innerHTML = `count is ${counter}`;
    };
    element.addEventListener('click', () => setCounter(counter + 1));
    setCounter(0);
}
