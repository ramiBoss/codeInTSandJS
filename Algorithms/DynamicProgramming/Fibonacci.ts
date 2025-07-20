// Fibonacci seequence brute force solution
export function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Fibonacci sequence memoization solution
export function fibonacciMemo(n: number, memo: Record<number, number> = {}): number {
    if (n <= 1) {
        return n;
    }
    if (memo[n]) {
        return memo[n];
    }
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// 

export function fibonacciIterative(n: number): number {
    const fib: number[] = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}
// Fibonacci sequence using matrix exponentiation
export function fibonacciMatrix(n: number): number {
    const matrix = [[1, 1], [1, 0]];
    if (n === 0) return 0;
    return matrixPower(matrix, n - 1)[0][0];
}

function matrixPower(matrix: number[][], n: number): number[][] {
    if (n === 1) return matrix;
    if (n % 2 === 0) {
        const half = matrixPower(matrix, n / 2);
        return multiplyMatrices(half, half);
    } else {
        return multiplyMatrices(matrix, matrixPower(matrix, n - 1));
    }
}

function multiplyMatrices(a: number[][], b: number[][]): number[][] {
    const result: number[][] = [[0, 0], [0, 0]];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            result[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
        }
    }
    return result;
}

