
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

const display = document.querySelector('.display');
display.textContent = 0;
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('.clear-button');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');

// display clicked numbers
numberButtons.forEach(b => {
    b.addEventListener ('click', () => {
        if (display.textContent === '0') {
            display.textContent = b.textContent;  
        } else {
        display.textContent += b.textContent;
        }
    })
})

clearButton.addEventListener('click', () => {
    display.textContent = '0';
})

operatorButtons.forEach(b => {
    b.addEventListener ('click', () => {
        let firstOperand = Number(display.textContent),
            operator = b.textContent;
        display.textContent += b.textContent;
        return firstOperandAndOperator = [firstOperand, operator];
    })
})

equalButton.addEventListener('click', () => {
    console.log(firstOperandAndOperator)
    let array = display.textContent.split(firstOperandAndOperator[1]);
    let secondOperand = Number(array[1]);
    console.log(...firstOperandAndOperator);
    display.textContent = operate(...firstOperandAndOperator, secondOperand);
})