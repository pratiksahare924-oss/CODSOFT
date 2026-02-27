/**
 * Simplified Calculator Logic 
 * Uses eval() for calculations as requested.
 */

// Display elements
const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

let expression = ""; // Stores the math string

// Update the screen
function updateDisplay(val = expression) {
    // If empty expression, show 0
    currentDisplay.innerText = val === "" ? "0" : val.toString().replace(/\*/g, '×').replace(/\//g, '÷');
}

// Add numbers or symbols
function appendValue(val) {
    // Prevent starting with an operator (except minus)
    if (expression === "" && ['*', '/', '+'].includes(val)) return;

    // Prevent multiple operators in a row
    const lastChar = expression.slice(-1);
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(lastChar) && operators.includes(val)) {
        // Swap operator instead of appending
        expression = expression.slice(0, -1) + val;
    } else {
        expression += val;
    }

    updateDisplay();
}

// Calculate the result
function calculate() {
    if (expression === "") return;

    try {
        // Show the expression in the "previous" area
        previousDisplay.innerText = expression.replace(/\*/g, '×').replace(/\//g, '÷') + " =";

        // Use simple eval
        const result = eval(expression);

        // Check for division by zero or errors
        if (!isFinite(result)) {
            throw new Error("ZeroDivision");
        }

        expression = result.toString();
        updateDisplay();
    } catch (error) {
        showError(error.message === "ZeroDivision" ? "Cannot divide by 0" : "Invalid Input");
    }
}

// Clear all
function clearDisplay() {
    expression = "";
    previousDisplay.innerText = "";
    updateDisplay();
}

// Delete last character
function deleteLast() {
    expression = expression.toString().slice(0, -1);
    updateDisplay();
}

// Error handling animation
function showError(msg) {
    currentDisplay.innerText = "Error";
    previousDisplay.innerText = msg;
    const container = document.getElementById('calculator');
    container.classList.add('error-vibrate');

    setTimeout(() => {
        container.classList.remove('error-vibrate');
        clearDisplay();
    }, 1500);
}

// --- EVENT LISTENERS ---

// Numbers
document.querySelectorAll('[data-number]').forEach(btn => {
    btn.addEventListener('click', () => {
        appendValue(btn.getAttribute('data-number'));
        animateBtn(btn);
    });
});

// Operators
document.querySelectorAll('[data-operator]').forEach(btn => {
    btn.addEventListener('click', () => {
        appendValue(btn.getAttribute('data-operator'));
        animateBtn(btn);
    });
});

// Equals
document.querySelector('[data-action="calculate"]').addEventListener('click', (e) => {
    calculate();
    animateBtn(e.target);
});

// Clear
document.querySelector('[data-action="all-clear"]').addEventListener('click', (e) => {
    clearDisplay();
    animateBtn(e.target);
});

// Delete
document.querySelector('[data-action="delete"]').addEventListener('click', (e) => {
    deleteLast();
    animateBtn(e.target);
});

// Animations
function animateBtn(btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 100);
}

// Keyboard Support
window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key) || key === '.') appendValue(key);
    if (['+', '-', '*', '/'].includes(key)) appendValue(key);
    if (key === 'Enter' || key === '=') calculate();
    if (key === 'Backspace') deleteLast();
    if (key === 'Escape') clearDisplay();

    // Trigger visual feedback for keyboard
    const btn = document.querySelector(`[data-number="${key}"], [data-operator="${key}"], [data-action]`);
    if (btn) animateBtn(btn);
});
