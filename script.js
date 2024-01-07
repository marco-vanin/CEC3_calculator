/* Constants */
const rootStyle = getComputedStyle(document.documentElement);
const operationBtnColor = rootStyle.getPropertyValue('--operation-color').trim();
const operationButtons = document.querySelectorAll('.operation');

/* Selectors */
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const oneBtn = document.getElementById('oneBtn');
const twoBtn = document.getElementById('twoBtn');
const threeBtn = document.getElementById('threeBtn');
const fourBtn = document.getElementById('fourBtn');
const fiveBtn = document.getElementById('fiveBtn');
const sixBtn = document.getElementById('sixBtn');
const sevenBtn = document.getElementById('sevenBtn');
const eightBtn = document.getElementById('eightBtn');
const nineBtn = document.getElementById('nineBtn');
const zeroBtn = document.getElementById('zeroBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalsBtn = document.getElementById('equalsBtn');
const clearBtn = document.getElementById('clearBtn');

/* Variables */

let firstParam = null;
let secondParam = null;
let operator = null;

/* Functions */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
};

const updateDisplay = (value) => {
    const display = document.getElementById('display');
    display.textContent = value;
};

const toggleStyleOperationButton = (isClicked, btn = null) => {
    if (!btn) {
        console.log(operationButtons)
        operationButtons.forEach((btn) => {
            console.log(btn)
            btn.style.backgroundColor = operationBtnColor;
        });
        return;
    }

    if (isClicked) {
        btn.style.backgroundColor = 'red';
    } else {
        btn.style.backgroundColor = operationBtnColor;
    }
}

/* Event Listeners */
oneBtn.addEventListener('click', () => {
    updateDisplay('1');

    if (firstParam === null) {
        firstParam = 1;
    } else {
        secondParam = 1;
        toggleStyleOperationButton(false);
    }
});

plusBtn.addEventListener('click', () => {
    if (firstParam === null) {
        return;
    }

    toggleStyleOperationButton(true, plusBtn);

    // If secondParam is null, then we are still on the first operation
    if (secondParam === null) {
        operator = '+';
    } else {
        // If secondParam is not null, then we are on the second operation
        const newFirstParam = operate(operator, firstParam, secondParam);
        secondParam = null;
        operator = '+';
        updateDisplay(newFirstParam);
    }
});

equalsBtn.addEventListener('click', () => {
    toggleStyleOperationButton(false);

    if (firstParam === null) {
        return;
    }

    if (secondParam === null) {
        return firstParam;
    }

    firstParam = operate(operator, firstParam, secondParam);
    secondParam = null;
    operator = null;
    updateDisplay(firstParam);
});
