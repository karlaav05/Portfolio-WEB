function calculateFibonacci() {
    // Get the input value
    const num = parseInt(document.getElementById("num").value);
    const resultLabel = document.getElementById("fibonacciLbl");

    // Validate the input
    if (isNaN(num) || num < 0) {
        resultLabel.textContent = "Please enter a non-negative integer.";
        return;
    }

    // Calculate the Fibonacci number
    const fib = fibonacci(num);

    // Display the result
    resultLabel.textContent = `Fibonacci(${num}) = ${fib}`;
}

// Recursive function to calculate Fibonacci number
function fibonacci(n) {
    if (n === 0) return 0; // F0 = 0
    if (n === 1 || n === 2) return 1; // F1 = 1 and F2 = 1
    return fibonacci(n - 1) + fibonacci(n - 2);
}
