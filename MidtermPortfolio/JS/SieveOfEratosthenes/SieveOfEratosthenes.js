
function sieveOfEratosthenes(n) {
    const isPrime = Array(n + 1).fill(true); // Step 1: Create a list
    isPrime[0] = isPrime[1] = false; // Step 2: Mark 0 and 1 as non-prime

    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            // Step 3: Mark multiples of p
            for (let i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }

    // Step 5: Collect all prime numbers
    return Array.from({ length: n + 1 }, (_, i) => (isPrime[i] ? i : null)).filter(Boolean);
}

document.getElementById('calculateButton').addEventListener('click', function() {
    const n = parseInt(document.getElementById('numberInput').value);
    if (isNaN(n) || n < 2) {
        document.getElementById('resultContainer').textContent = 'Please enter a valid integer greater than 1.';
        return;
     }
    const primes = sieveOfEratosthenes(n);
    document.getElementById('resultContainer').textContent = `All prime numbers less than or equal to ${n}: ${primes.join(', ')}`;
});