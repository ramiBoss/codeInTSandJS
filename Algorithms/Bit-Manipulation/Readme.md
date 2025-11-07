Bit Manipulation Tips and Tricks
===============================
This document provides useful tips and tricks for solving bit manipulation problems in TypeScript. It covers common operations, techniques, and examples to help you understand and implement bit manipulation effectively.
1. Basic Bitwise Operations
------------------------
- AND (`&`): Used to clear bits. Example: `x & 1` clears all bits except the least significant bit.
- OR (`|`): Used to set bits. Example: `x | 1` sets the least significant bit to 1.
- XOR (`^`): Used to toggle bits. Example: `x ^ 1` flips the least significant bit.
- NOT (`~`): Used to invert bits. Example: `~x` flips all bits of `x`.
2. Common Bit Manipulation Techniques
-------------------------------
- Checking if a number is even or odd: `x & 1` returns `0` for even and `1` for odd.
- Checking if a number is a power of two: `x > 0 && (x & (x - 1)) === 0`.
- Counting the number of set bits (Hamming Weight): Use Brian Kernighan’s algorithm:
  ```typescript
  function hammingWeight(n: number): number {
      let count = 0;
      while (n) {
          n &= (n - 1);
          count++;
      }
      return count;
  }
  ```
- Swapping two numbers without a temporary variable:
  ```typescript
  function swap(a: number, b: number): [number, number] {
      a = a ^ b;
      b = a ^ b;
      a = a ^ b;
      return [a, b];
  }
  ```
3. Bit Manipulation in Arrays
-------------------------------
- Finding the single number in an array where every other number appears twice:
  ```typescript
  function singleNumber(nums: number[]): number {
      let result = 0;
      for (let num of nums) {
          result ^= num;
      }
      return result;
  }
  ```
- Finding the missing number in an array of size `n` containing numbers from `0` to `n`:
  ```typescript
  function missingNumber(nums: number[]): number {
      let result = nums.length;
      for (let i = 0; i < nums.length; i++) {
          result ^= i ^ nums[i];
      }
      return result;
  }
  ```

4. Advanced Bit Manipulation Techniques
---------------------------------------

### Bit Masks and Subsets
- Generate all subsets of a set using bit manipulation:
  ```typescript
  function generateSubsets(nums: number[]): number[][] {
      const result: number[][] = [];
      const n = nums.length;
      
      for (let mask = 0; mask < (1 << n); mask++) {
          const subset: number[] = [];
          for (let i = 0; i < n; i++) {
              if (mask & (1 << i)) {
                  subset.push(nums[i]);
              }
          }
          result.push(subset);
      }
      return result;
  }
  ```

### Getting, Setting, and Clearing Bits
- Get i-th bit: `(num >> i) & 1`
- Set i-th bit: `num | (1 << i)`
- Clear i-th bit: `num & ~(1 << i)`
- Toggle i-th bit: `num ^ (1 << i)`

### Range Operations
- Clear bits from i to 0: `num & (~((1 << (i + 1)) - 1))`
- Clear bits from MSB to i: `num & ((1 << i) - 1)`
- Update i-th bit: `(num & ~(1 << i)) | (value << i)`

5. Bit Manipulation Patterns for Interviews
-------------------------------------------

### Pattern 1: XOR Properties
- `a ^ a = 0`
- `a ^ 0 = a`
- XOR is commutative and associative

### Pattern 2: Brian Kernighan's Algorithm
- `n & (n-1)` removes the rightmost set bit
- Useful for counting set bits efficiently

### Pattern 3: Isolating Rightmost Set Bit
- `n & -n` isolates the rightmost set bit
- `-n` is the two's complement of n

### Pattern 4: Checking Power of Two
- `n > 0 && (n & (n-1)) === 0`
- Works because powers of 2 have exactly one bit set

---

# Bit Manipulation Cheatsheet 🚀

## Quick Reference Table

| Operation | Symbol | Example | Result | Use Case |
|-----------|---------|---------|---------|----------|
| AND | `&` | `5 & 3` | `1` (101 & 011 = 001) | Clear bits, check bits |
| OR | `\|` | `5 \| 3` | `7` (101 \| 011 = 111) | Set bits |
| XOR | `^` | `5 ^ 3` | `6` (101 ^ 011 = 110) | Flip bits, find unique |
| NOT | `~` | `~5` | `-6` (~101 = ...11111010) | Invert all bits |
| Left Shift | `<<` | `5 << 2` | `20` (101 << 2 = 10100) | Multiply by 2^n |
| Right Shift | `>>` | `20 >> 2` | `5` (10100 >> 2 = 101) | Divide by 2^n |

## Essential Bit Tricks

### 🔢 Number Properties
```typescript
// Check if even/odd
const isEven = (n: number) => (n & 1) === 0;

// Check if power of 2
const isPowerOfTwo = (n: number) => n > 0 && (n & (n - 1)) === 0;

// Get absolute value (for positive numbers)
const abs = (n: number) => (n ^ (n >> 31)) - (n >> 31);

// Check if two numbers have opposite signs
const oppositeSign = (a: number, b: number) => (a ^ b) < 0;
```

### 🎯 Bit Position Operations
```typescript
// Get i-th bit (0-indexed from right)
const getBit = (num: number, i: number) => (num >> i) & 1;

// Set i-th bit to 1
const setBit = (num: number, i: number) => num | (1 << i);

// Clear i-th bit (set to 0)
const clearBit = (num: number, i: number) => num & ~(1 << i);

// Toggle i-th bit
const toggleBit = (num: number, i: number) => num ^ (1 << i);

// Update i-th bit to value (0 or 1)
const updateBit = (num: number, i: number, value: number) => 
    (num & ~(1 << i)) | (value << i);
```

### 🎭 Advanced Tricks
```typescript
// Count number of 1s (Hamming Weight)
const countOnes = (n: number) => {
    let count = 0;
    while (n) {
        n &= (n - 1); // Remove rightmost 1
        count++;
    }
    return count;
};

// Find rightmost set bit position
const rightmostSetBit = (n: number) => n & -n;

// Swap two numbers without temp variable
const swap = (a: number, b: number) => [a ^ b, a ^ b, a ^ (a ^ b)];

// Reverse bits of a 32-bit integer
const reverseBits = (n: number) => {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result >>> 0; // Unsigned right shift
};
```

### 🔄 Bit Manipulation Patterns
```typescript
// Pattern: Find single number (others appear twice)
const singleNumber = (nums: number[]) => nums.reduce((a, b) => a ^ b, 0);

// Pattern: Find two single numbers (others appear twice)
const singleNumbers = (nums: number[]) => {
    const xor = nums.reduce((a, b) => a ^ b, 0);
    const rightmostBit = xor & -xor;
    const [a, b] = [0, 0];
    
    for (const num of nums) {
        if (num & rightmostBit) a ^= num;
        else b ^= num;
    }
    return [a, b];
};

// Pattern: Generate all subsets
const subsets = (nums: number[]) => {
    const result = [];
    const n = nums.length;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        const subset = [];
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push(nums[i]);
            }
        }
        result.push(subset);
    }
    return result;
};
```

## 🎯 Common Interview Problems & Solutions

### 1. Missing Number
```typescript
// XOR approach - O(n) time, O(1) space
const missingNumber = (nums: number[]) => {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    return missing;
};
```

### 2. Power of Four
```typescript
const isPowerOfFour = (n: number) => {
    // Must be power of 2 AND set bit at even position
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
};
```

### 3. Hamming Distance
```typescript
const hammingDistance = (x: number, y: number) => {
    let xor = x ^ y;
    let count = 0;
    while (xor) {
        count++;
        xor &= (xor - 1); // Brian Kernighan's algorithm
    }
    return count;
};
```

### 4. Maximum XOR of Two Numbers
```typescript
const findMaximumXOR = (nums: number[]) => {
    let max = 0;
    let mask = 0;
    
    for (let i = 30; i >= 0; i--) {
        mask |= (1 << i);
        const prefixes = new Set(nums.map(num => num & mask));
        const candidate = max | (1 << i);
        
        for (const prefix of prefixes) {
            if (prefixes.has(candidate ^ prefix)) {
                max = candidate;
                break;
            }
        }
    }
    return max;
};
```

## 🧠 Memory Aids

### XOR Properties
- **Commutative**: `a ^ b = b ^ a`
- **Associative**: `(a ^ b) ^ c = a ^ (b ^ c)`
- **Self-inverse**: `a ^ a = 0`
- **Identity**: `a ^ 0 = a`

### Power of 2 Check
- Powers of 2 in binary: `1, 10, 100, 1000, ...`
- `n & (n-1)` removes the rightmost set bit
- For power of 2: only one bit is set, so result is 0

### Brian Kernighan's Algorithm
- `n & (n-1)` clears the lowest set bit
- Useful for counting set bits efficiently
- Time complexity: O(number of set bits)

## 🚨 Common Pitfalls

1. **Signed vs Unsigned**: JavaScript uses 32-bit signed integers
2. **Overflow**: Be careful with large numbers and shifts
3. **Precedence**: Bitwise operators have lower precedence than arithmetic
4. **Sign Extension**: Right shift (`>>`) preserves sign, use `>>>` for logical shift

---

## 📚 Practice Problems by Difficulty

### Easy
- Single Number
- Missing Number  
- Hamming Weight
- Power of Two
- Reverse Bits

### Medium
- Single Number II
- Bitwise AND of Numbers Range
- Maximum XOR of Two Numbers
- Gray Code
- Subsets

### Hard
- Maximum XOR of Two Numbers in Array
- Smallest Range Covering Elements from K Lists
- Freedom Trail

---

*Happy Coding! 🎉*