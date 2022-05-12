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
        case '÷':
            return divide(a, b);
            break;
        case 'ˆ':
            return expo(a, b);
            break;
    }
}



// -------------------------------- //


// Add listeners to buttons

const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('.clear-button')
const operatorButtons = document.querySelectorAll('.operator')
const squareButton = document.querySelector('.square')
const equalButton = document.querySelector('.equal')
const floatButton = document.querySelector('.float');


const display = document.querySelector('.display');
const operandDisplay = document.querySelector('.operand-display');
const computationDisplay = document.querySelector('.computation-display');

let currentOperand = null;
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

operandDisplay.textContent = Number(currentOperand);

numberButtons.forEach(b => {
    b.addEventListener('click', () => {
        if (computationDisplay.textContent.includes('=')) {
            computationDisplay.textContent =  currentOperand;
        }
        computationDisplay.textContent += b.textContent;
        if (operandDisplay.textContent.endsWith('.')) {
            currentOperand = Number(Number(currentOperand) + '.' + b.textContent)
        } else {
            currentOperand = Number(Number(currentOperand) + b.textContent);
        }
        if (operandDisplay.textContent.includes('√')) {
            operandDisplay.textContent = `√${currentOperand}`;
        } else {
        operandDisplay.textContent = currentOperand;
        }
        if (operator) secondOperand = currentOperand;
    })
})

operatorButtons.forEach(b => {
    b.addEventListener('click', () => {
        if (currentOperand) {
            if (computationDisplay.textContent.includes('=')) {
                computationDisplay.textContent =  currentOperand;
            }
            if (secondOperand || secondOperand === 0) {
                currentOperand = operate(firstOperand, operator, secondOperand);
                operandDisplay.textContent = currentOperand;
            }
            computationDisplay.textContent += b.textContent;
            firstOperand = currentOperand;
            currentOperand = null;
            operator = b.textContent; 
        }else {
            operator = b.textContent;
            computationDisplay.textContent.replace
            computationDisplay.textContent = computationDisplay.textContent.slice(0, -1) + b.textContent;
        }
    })
})

clearButton.addEventListener('click', () => {
    currentOperand = null;
    operandDisplay.textContent = Number(currentOperand);
    computationDisplay.textContent =  '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
})

equalButton.addEventListener('click', () => {
    if (secondOperand || secondOperand === 0) {
        let result = operate(firstOperand, operator, secondOperand);
        operandDisplay.textContent = result; 
        computationDisplay.textContent = computationDisplay.textContent + equalButton.textContent + result;
        currentOperand = result;
        firstOperand = null;
        secondOperand = null;
        operator = null;
    }
})

floatButton.addEventListener('click', () => {
    operandDisplay.textContent += floatButton.textContent;
    computationDisplay.textContent += floatButton.textContent;
    currentOperand = operandDisplay.textContent;
})
