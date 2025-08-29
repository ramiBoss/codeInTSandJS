/**
 * Valid Palindrome
 * 
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * @param s - Input string
 * @returns true if string is a palindrome, false otherwise
 */
export function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphanumeric(s[left]!)) {
      left++;
    }
    
    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphanumeric(s[right]!)) {
      right--;
    }
    
    // Compare characters (case-insensitive)
    if (s[left]!.toLowerCase() !== s[right]!.toLowerCase()) {
      return false;
    }
    
    left++;
    right--;
  }
  
  return true;
}

/**
 * Helper function to check if character is alphanumeric
 */
function isAlphanumeric(char: string): boolean {
  return /[a-zA-Z0-9]/.test(char);
}

/**
 * Alternative implementation using string manipulation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function isPalindromeStringManip(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
