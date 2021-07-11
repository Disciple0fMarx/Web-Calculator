class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.equalsPressed = false;
        this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation !== undefined) {
            this.previousOperandElement.innerText = this.previousOperand + this.operation;
        } else {
            this.previousOperandElement.innerText = this.previousOperand;
        };
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") {
            if (this.previousOperand !== "") {
                this.operation = operation;
            }
            return;
        }
        if (this.previousOperand !== "") this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '÷':
                result = previous / current;
                break;
            case '×':
                result = previous * current;
                break;
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    negate() {
        if (this.currentOperand === "") return;
        this.currentOperand = -this.currentOperand;
    }
}


const clearAllButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-delete]');
const negateButton = document.querySelector('[data-negate]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]');

const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

var calculator = new Calculator(previousOperandElement, currentOperandElement);

clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.equalsPressed = false;
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.equalsPressed = false;
    calculator.updateDisplay();
});

negateButton.addEventListener('click', () => {
    calculator.negate();
    calculator.equalsPressed = false;
    calculator.updateDisplay();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.equalsPressed) {
            calculator.clear();
            calculator.equalsPressed = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.equalsPressed = false;
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.equalsPressed = true;
    calculator.updateDisplay();
});
