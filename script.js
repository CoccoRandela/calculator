
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


const numberButtons = document.querySelectorAll('.number'),
clearButton = document.querySelector('.clear-button'),
operatorButtons = document.querySelectorAll('.operator'),
squareButton = document.querySelector('.square'),
equalButton = document.querySelector('.equal'),
signButton = document.querySelector('.sign');

const display = document.querySelector('.display'),
operandDisplay = document.querySelector('.operand-display'),
computationDisplay = document.querySelector('.computation-display');

let currentOperand = null,
firstOperand = null,
secondOperand = null,
operator = null;
result = null;

operandDisplay.textContent = Number(currentOperand);


numberButtons.forEach(b => {
    b.addEventListener('click', () => {
        if (computationDisplay.textContent.includes('=')) {
            computationDisplay.textContent =  currentOperand;
        }
        computationDisplay.textContent += b.textContent;
        currentOperand = Number(Number(currentOperand) + b.textContent);
        operandDisplay.textContent = currentOperand;
        if (operator) secondOperand = currentOperand;
    })
})

operatorButtons.forEach(b => {
    b.addEventListener('click', () => {
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

signButton.addEventListener('click', () => {
    if (currentOperand) {
        if (currentOperand > 0) {
            computationDisplay.textContent = computationDisplay.textContent.slice(0, -currentOperand.toString().length)
            currentOperand = subtract(currentOperand, currentOperand*2);
            operandDisplay.textContent = currentOperand;
            computationDisplay.textContent += `(${currentOperand})`;
        } else if (currentOperand < 0) {
            computationDisplay.textContent = computationDisplay.textContent.slice(0, -currentOperand.toString().length-2)
            currentOperand = subtract(currentOperand, currentOperand*2)
            operandDisplay.textContent = currentOperand;
            operandDisplay.textContent = currentOperand;
            computationDisplay.textContent += currentOperand;
        }
    } else {
        if (firstOperand > 0) {
            firstOperand = subtract(firstOperand, firstOperand*2);
            operandDisplay.textContent = firstOperand;
        } else if (firstOperand < 0) {
            firstOperand = subtract(currentOperand, currentOperand*2)
            operandDisplay.textContent = firstOperand;
        }
    }
    if (operator) secondOperand = currentOperand;
})
