// -------------------------------- //

function add(a, b) {
    return a + b;
}

function subtract (a, b) {
    return a-b;
}

function multiply (a, b) {
    return a*b;
}

function divide (a, b) {
    if (b === 0) return 'Cannot divide by 0';
    else return a/b; 
}

function expo (a, b) {
    let result = 1;
    for (let i=0; i<b; i++) {
        result *= a;
    }
    return result;
}

function returnSquare() {
    const square = Math.sqrt(operandDisplay.textContent);
    computationDisplay.textContent = computationDisplay.textContent.slice(0, -operandDisplay.textContent.length) + square;
    currentOperand = square;
    operandDisplay.textContent = currentOperand;
    if (operator) secondOperand = currentOperand;
}

function operate (a, operator, b) {
    switch(operator) {
        case '+':
          return add(a, b);
          break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        case 'ˆ':
            return expo(a, b);
            break;
    }
}

const display = document.querySelector('.display');
const operandDisplay = document.querySelector('.operand-display');
const computationDisplay = document.querySelector('.computation-display');

let currentOperand = null;
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

operandDisplay.textContent = Number(currentOperand);



function addNumbers(b) {
    if (computationDisplay.textContent.includes('=')) {
        computationDisplay.textContent =  currentOperand;
    }
    computationDisplay.textContent += b;
    if (operandDisplay.textContent.endsWith('.')) {
        currentOperand = Number(Number(currentOperand) + '.' + b)
    } else {
        currentOperand = Number(Number(currentOperand) + b);
    }
    operandDisplay.textContent = currentOperand;
    if (operator) secondOperand = currentOperand;
}

function selectOperator(b) {
    if (currentOperand) {
        if (computationDisplay.textContent.includes('=')) {
            computationDisplay.textContent =  currentOperand;
        }
        if (secondOperand || secondOperand === 0) {
            currentOperand = operate(firstOperand, operator, secondOperand);
            operandDisplay.textContent = currentOperand;
        }
        computationDisplay.textContent += b;
        firstOperand = currentOperand;
        currentOperand = null;
        operator = b; 
    } else {
        operator = b;
        computationDisplay.textContent = computationDisplay.textContent.slice(0, -1) + b;
    }
}

function clearAll() {
    currentOperand = null;
    operandDisplay.textContent = Number(currentOperand);
    computationDisplay.textContent =  '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
}

function getResult(equalButton) {
    if (secondOperand || secondOperand === 0) {
        let result = operate(firstOperand, operator, secondOperand);
        operandDisplay.textContent = result; 
        computationDisplay.textContent = computationDisplay.textContent + equalButton.textContent + result;
        currentOperand = result;
        firstOperand = null;
        secondOperand = null;
        operator = null;
    }
}

function makeFloat(floatButton) {
    operandDisplay.textContent += floatButton.textContent;
    computationDisplay.textContent += floatButton.textContent;
    currentOperand = operandDisplay.textContent;
}

function isOperator(key) {
    const operators = document.querySelectorAll('.operator');
    for (let i=0; i<operators.length; i++) {
        if (operators[i].textContent === key) return true;
    }
    return false;
}




// -------------------------------- //


document.addEventListener('keydown', (e) => {
    if(!isNaN(Number(e.key))) {
        addNumbers(e.key);
    };
    if (isOperator(e.key)) {
        selectOperator(e.key);
    }
    if (e.key === 'Enter') {
        getResult(document.querySelector('.equal'));
    }
    if (e.key === '.') {
        makeFloat(document.querySelector('.float'));
    }
    if (e.key ==='Backspace') {
        clearAll(document.querySelector('.clear-all'))
    }
})