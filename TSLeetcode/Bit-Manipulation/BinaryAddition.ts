/**
 * Binary Addition
 * Given two binary strings, return their sum (also a binary string).
 */

function addBinary(a: string, b: string): string {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry) {
        const sum = carry + (a[i] ? Number(a[i]) : 0) + (b[j] ? Number(b[j]) : 0);
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
        i--;
        j--;
    }

    return result;
}

export { addBinary };