
// math functions
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
    }
}


const numberButtons = document.querySelectorAll('.number'),
clearButton = document.querySelector('.clear-button'),
operatorButtons = document.querySelectorAll('.operator'),
equalButton = document.querySelector('.equal');

const display = document.querySelector('.display'),
operandDisplay = document.querySelector('.operand-display'),
computationDisplay = document.querySelector('.computation-display');

let currentOperand = null,
firstOperand = null,
secondOperand = null,
operator = null;

operandDisplay.textContent = Number(currentOperand);


numberButtons.forEach(b => {
    b.addEventListener('click', () => {
        computationDisplay.textContent += b.textContent;
        currentOperand = Number(Number(currentOperand) + b.textContent);
        operandDisplay.textContent = currentOperand;
        if (operator) return secondOperand = currentOperand;
    })
})

operatorButtons.forEach(b => {
    b.addEventListener('click', () => {
        if (secondOperand || secondOperand === 0) {
            currentOperand = operate(firstOperand, operator, secondOperand);
            operandDisplay.textContent = currentOperand;
        }
        computationDisplay.textContent += b.textContent;
        return firstOperand = currentOperand,
        currentOperand = 0,
        operator = b.textContent;    
    })
})

