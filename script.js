/* Constants */
const rootStyle = getComputedStyle(document.documentElement);
const operationBtnColor = rootStyle.getPropertyValue('--operation-color').trim();
const operationButtons = document.querySelectorAll('.operation');
const numberButtons = document.querySelectorAll('.number');

/* Selectors */
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalsBtn = document.getElementById('equalsBtn');
const clearBtn = document.getElementById('clearBtn');

/* Variables */
const operationData = {
    firstParam: null,
    secondParam: null,
    operator: null,
    justClickedEquals: false,
};

/* Functions */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
    const floatedA = parseFloat(a);
    const floatedB = parseFloat(b);

    switch (operator) {
        case '+':
            return add(floatedA, floatedB);
        case '-':
            return subtract(floatedA, floatedB);
        case 'x':
            return multiply(floatedA, floatedB);
        case '/':
            return divide(floatedA, floatedB);
    }
};

const updateDisplay = (value) => {
    const display = document.getElementById('display');
    display.textContent = value;
};

// const toggleStyleOperationButton = (isClicked, btn = null) => {
//     if (!btn) {
//         console.log(operationButtons)
//         operationButtons.forEach((btn) => {
//             console.log(btn)
//             btn.style.backgroundColor = operationBtnColor;
//         });
//         return;
//     }

//     if (isClicked) {
//         btn.style.backgroundColor = 'red';
//     } else {
//         btn.style.backgroundColor = operationBtnColor;
//     }
// }

/* Event Listeners */
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        if (operationData.justClickedEquals) {
            console.log('just clicked equals')
            operationData.firstParam = null;
        }

        if (operationData.firstParam === null) {
            console.log('first param is null')
            operationData.firstParam = numberButton.textContent;
            operationData.justClickedEquals = false;
            updateDisplay(operationData.firstParam);
            return;
        }

        if (operationData.operator === null) {
            console.log('operator is null')
            operationData.firstParam += numberButton.textContent;
            updateDisplay(operationData.firstParam);
        } else {
            if (operationData.operator !== null) {
                console.log('operator is not null')
                if (operationData.secondParam === null) {
                    console.log('second param is null')
                    operationData.secondParam = numberButton.textContent;
                    updateDisplay(operationData.secondParam);
                } else {
                    console.log('second param is not null')
                    operationData.secondParam += numberButton.textContent;
                    updateDisplay(operationData.secondParam);
                }
            }
        }
    });
});

decimalBtn.addEventListener('click', () => {
    if (operationData.justClickedEquals) {
        operationData.firstParam = null;
    }

    if (operationData.firstParam === null) {
        operationData.firstParam = '0.';
        operationData.justClickedEquals = false;
        updateDisplay(operationData.firstParam);
        return;
    }

    if (operationData.operator === null) {
        if (operationData.firstParam.includes('.')) {
            return;
        } else {
            operationData.firstParam += '.';
            updateDisplay(operationData.firstParam);
        }
    } else {
        if (operationData.secondParam === null) {
            operationData.secondParam = '0.';
            updateDisplay(operationData.secondParam);
        } else {
            if (operationData.secondParam.includes('.')) {
                return;
            } else {
                operationData.secondParam += '.';
                updateDisplay(operationData.secondParam);
            }
        }
    }
});


operationButtons.forEach((operationButton) => {
    operationButton.addEventListener('click', () => {
        operationData.operator = operationButton.textContent;
        operationData.justClickedEquals = false;
    })
});

clearBtn.addEventListener('click', () => {
    updateDisplay('0');
    operationData.firstParam = null;
    operationData.secondParam = null;
    operationData.operator = null;
    operationData.justClickedEquals = false;
});

equalsBtn.addEventListener('click', () => {
    operationData.justClickedEquals = true;

    if (operationData.firstParam === null) {
        return;
    }

    if (operationData.secondParam === null) {
        return operationData.firstParam
    }

    const result = operate(operationData.operator, operationData.firstParam, operationData.secondParam);
    operationData.firstParam = parseFloat(result.toFixed(7));
    operationData.secondParam = null;
    operationData.operator = null;
    updateDisplay(operationData.firstParam);
});



// plusBtn.addEventListener('click', () => {
//     if (firstParam === null) {
//         return;
//     }

//     toggleStyleOperationButton(true, plusBtn);

//     // If secondParam is null, then we are still on the first operation
//     if (secondParam === null) {
//         operator = '+';
//     } else {
//         // If secondParam is not null, then we are on the second operation
//         const newFirstParam = operate(operator, firstParam, secondParam);
//         secondParam = null;
//         operator = '+';
//         updateDisplay(newFirstParam);
//     }
// });

// equalsBtn.addEventListener('click', () => {
//     toggleStyleOperationButton(false);

//     if (firstParam === null) {
//         return;
//     }

//     if (secondParam === null) {
//         return firstParam;
//     }

//     firstParam = operate(operator, firstParam, secondParam);
//     secondParam = null;
//     operator = null;
//     updateDisplay(firstParam);
// });
