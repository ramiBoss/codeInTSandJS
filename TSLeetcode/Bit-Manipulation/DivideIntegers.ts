/**
 * Divide Integers without using multiplication, division and mod operator.
 * Return the quotient after dividing dividend by divisor.
 * The integer division should truncate toward zero.
 *
 * Example:
 * Input: dividend = 10, divisor = 3
 * Output: 3
 * 
 * Input: dividend = 7, divisor = -3
 * Output: -2
 * 
 * Time Complexity: O(log^2(n)) where n is the dividend
 * Space Complexity: O(1)
 */


/**
 * Pseudocode:
 * 1. Handle edge case for overflow when dividend is INT_MIN and divisor is -1.
 * 2. Determine the sign of the quotient.
 * 3. Work with positive values of dividend and divisor.
 * 4. Use bit manipulation (left shift) to find the quotient.
 * 5. Return the final quotient with the correct sign.
 * 
 * @param dividend 
 * @param divisor 
 * @returns 
 */



function divide(dividend: number, divisor: number): number {
    const INT_MIN = -2147483648;
    const INT_MAX = 2147483647;
    
    // Handle edge cases
    if (divisor === 0) return INT_MAX;
    if (dividend === 0) return 0;
    if (dividend === INT_MIN && divisor === -1) return INT_MAX;
    
    // Determine sign
    const negative = (dividend < 0) !== (divisor < 0);
    
    // Work with positive numbers using long arithmetic
    // Convert to positive, handling INT_MIN carefully
    let dvd = dividend < 0 ? -(dividend as any) : dividend;
    let dvs = divisor < 0 ? -(divisor as any) : divisor;
    
    // For JavaScript, we need to handle the INT_MIN case
    if (dividend === INT_MIN) {
        dvd = 2147483648; // This is 2^31, larger than INT_MAX
    }
    
    let quotient = 0;
    
    // Exponential search approach
    while (dvd >= dvs) {
        let shift = 0;
        
        // Find the largest shift where (dvs << shift) <= dvd
        // Be careful about overflow
        while (dvd >= (dvs << (shift + 1)) && (dvs << (shift + 1)) > 0) {
            shift++;
        }
        
        quotient += (1 << shift);
        dvd -= (dvs << shift);
    }
    
    const result = negative ? -quotient : quotient;
    
    // Clamp to 32-bit signed integer range
    if (result > INT_MAX) return INT_MAX;
    if (result < INT_MIN) return INT_MIN;
    
    return result;
}

export { divide };