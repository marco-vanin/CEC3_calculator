/* Constants */
const rootStyle = getComputedStyle(document.documentElement);
const operationBtnColor = rootStyle.getPropertyValue('--operation-color').trim();
const operationButtons = document.querySelectorAll('.operation');
const numberButtons = document.querySelectorAll('.number');
const body = document.querySelector('body');
const operators = ['+', '-', '*', '/'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


/* Selectors */
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
    display.textContent = value;
};

const handleNumberButtonClick = (numberButton) => {
    toggleStyleOperationButton(null);

    if (operationData.justClickedEquals) {
        operationData.firstParam = null;
        operationData.justClickedEquals = false;
    }

    const param = (operationData.operator === null ? 'firstParam' : 'secondParam');
    operationData[param] = (operationData[param] === null) ? numberButton.textContent : operationData[param] + numberButton.textContent;
    updateDisplay(operationData[param]);
};

const handleDecimalButtonClick = () => {
    toggleStyleOperationButton(null);

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
};

const handleOperationButtonClick = (operationButton) => {
    if (operationData.firstParam === null) {
        operationData.firstParam = '0';
    }

    operationData.operator = operationButton.textContent;
    toggleStyleOperationButton(operationButton);
    operationData.justClickedEquals = false;
};

const toggleStyleOperationButton = (btn) => {
    operationButtons.forEach((operationButton) => {
        operationButton.style.backgroundColor = (operationButton === btn) ? '#EF8358' : operationBtnColor;
    });
};

const handleClearButtonClick = () => {
    updateDisplay('0');
    operationData.firstParam = null;
    operationData.secondParam = null;
    operationData.operator = null;
    operationData.justClickedEquals = false;
};

const handleEqualsButtonClick = () => {
    operationData.justClickedEquals = true;

    if (operationData.firstParam !== null && operationData.secondParam !== null) {
        const result = operate(operationData.operator, operationData.firstParam, operationData.secondParam);
        operationData.firstParam = operationData.firstParam == 0 ? 0 : parseFloat(result.toFixed(7)).toString();
        operationData.secondParam = null;
        operationData.operator = null;
        updateDisplay(operationData.firstParam);
    }
};

const handleKeyPress = (e) => {
    const key = e.key;

    switch (key) {
        case '.':
            handleDecimalButtonClick();
            break;
        case 'Enter':
            handleEqualsButtonClick();
            break;
        case 'Escape':
            handleClearButtonClick();
            break;
        case 'Backspace':
            handleBackspace();
            break;
        case 'Delete':
            handleClearButtonClick();
            break;
        default:
            if (operators.includes(key) || numbers.includes(key)) {
                const element = document.getElementById(`${key}`);

                if (operators.includes(key)) handleOperationButtonClick(element);
                else {
                    handleNumberButtonClick(element);

                    console.log(element)

                    // TODO : Add hover effect on keypress
                    // // Add a class for hover effect
                    // element.classList.add('hover-effect');

                    // // Remove the class after a short delay
                    // setTimeout(() => {
                    //     element.classList.remove('hover-effect');
                    // }, 300);
                }
            }
            break;
    }
};

const handleBackspace = () => {
    const { firstParam, secondParam, operator } = operationData;

    if (secondParam !== null) {
        operationData.secondParam = secondParam.length === 1 ? '0' : secondParam.slice(0, -1);
        updateDisplay(operationData.secondParam);
    } else if (operator !== null) {
        operationData.operator = null;
        toggleStyleOperationButton(null);
    } else if (firstParam !== null) {
        operationData.firstParam = firstParam.length === 1 ? '0' : firstParam.slice(0, -1);
        updateDisplay(operationData.firstParam);
    } else {
        updateDisplay('0');
    }
};

/* Event Listeners */
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => handleNumberButtonClick(numberButton));
});

decimalBtn.addEventListener('click', handleDecimalButtonClick);

operationButtons.forEach((operationButton) => {
    operationButton.addEventListener('click', () => handleOperationButtonClick(operationButton));
});

clearBtn.addEventListener('click', handleClearButtonClick);

equalsBtn.addEventListener('click', handleEqualsButtonClick);

body.addEventListener('keydown', handleKeyPress);
