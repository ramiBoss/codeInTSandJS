import { isPalindrome, isPalindromeStringManip } from './valid-palindrome';

describe('Valid Palindrome', () => {
  describe('isPalindrome (Two Pointers)', () => {
    it('should return true for valid palindromes', () => {
      expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
      expect(isPalindrome("race a car")).toBe(false);
      expect(isPalindrome(" ")).toBe(true);
    });

    it('should handle empty string', () => {
      expect(isPalindrome("")).toBe(true);
    });

    it('should handle single character', () => {
      expect(isPalindrome("a")).toBe(true);
      expect(isPalindrome("A")).toBe(true);
    });

    it('should ignore case and special characters', () => {
      expect(isPalindrome("Madam")).toBe(true);
      expect(isPalindrome("No 'x' in Nixon")).toBe(true);
      expect(isPalindrome("Mr. Owl ate my metal worm")).toBe(true);
    });

    it('should handle strings with numbers', () => {
      expect(isPalindrome("A1B2b1a")).toBe(true);
      expect(isPalindrome("0P")).toBe(false);
    });

    it('should handle strings with only special characters', () => {
      expect(isPalindrome(".,!@#")).toBe(true);
    });
  });

  describe('isPalindromeStringManip (String Manipulation)', () => {
    it('should return same results as two-pointer approach', () => {
      const testCases = [
        "A man a plan a canal Panama",
        "race a car",
        " ",
        "",
        "a",
        "Madam",
        "No 'x' in Nixon",
        "A1B2b1a",
        "0P",
        ".,!@#"
      ];

      testCases.forEach(testCase => {
        expect(isPalindromeStringManip(testCase)).toBe(isPalindrome(testCase));
      });
    });
  });

  describe('Performance comparison', () => {
    it('should compare performance of both approaches', () => {
      const longString = "A".repeat(10000) + "B".repeat(10000) + "A".repeat(10000);
      
      const start1 = performance.now();
      const result1 = isPalindrome(longString);
      const end1 = performance.now();
      
      const start2 = performance.now();
      const result2 = isPalindromeStringManip(longString);
      const end2 = performance.now();
      
      console.log(`Two pointers: ${end1 - start1}ms`);
      console.log(`String manipulation: ${end2 - start2}ms`);
      
      expect(result1).toBe(result2);
    });
  });
});
