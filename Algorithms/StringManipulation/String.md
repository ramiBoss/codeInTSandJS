# Commonly Asked String Manipulation Interview Questions

String manipulation is a fundamental topic in programming interviews. These questions test your understanding of string properties, algorithms, and efficiency.

---

## Basic Questions (Good starting points)

1.  **Reverse a String:**
    * Given a string, return its reverse.
    * *Example:* "hello" -> "olleh"
    * *Follow-up:* Do it without using built-in reverse functions.

2.  **Check for Palindrome:**
    * Given a string, determine if it's a palindrome (reads the same forwards and backwards).
    * *Example:* "madam" -> true, "racecar" -> true, "hello" -> false
    * *Follow-up:* Consider case-insensitivity and ignoring non-alphanumeric characters.

3.  **Count Character Occurrences:**
    * Given a string and a character, count how many times that character appears in the string.
    * *Example:* ("programming", 'g') -> 2

4.  **Remove Duplicates from String:**
    * Given a string, return a new string with all duplicate characters removed. The order of the remaining characters should be preserved.
    * *Example:* "banana" -> "ban"

5.  **Capitalize First Letter of Each Word:**
    * Given a sentence, capitalize the first letter of each word.
    * *Example:* "hello world" -> "Hello World"

6.  **Check for Anagrams:**
    * Given two strings, determine if they are anagrams of each other (contain the same characters with the same frequencies).
    * *Example:* ("listen", "silent") -> true, ("hello", "world") -> false

---

## Intermediate Questions (Require more thought on algorithms)

7.  **Find the First Non-Repeating Character:**
    * Given a string, find the first character that does not repeat anywhere in the string.
    * *Example:* "leetcode" -> 'l', "loveleetcode" -> 'v'

8.  **Longest Palindromic Substring:**
    * Given a string `s`, return the longest palindromic substring in `s`.
    * *Example:* "babad" -> "bab" (or "aba"), "cbbd" -> "bb"

9.  **Valid Parentheses:**
    * Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
    * *Rules:* Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.
    * *Example:* "()[]{}" -> true, "([)]" -> false

10. **String to Integer (atoi):**
    * Implement the `atoi` function, which converts a string to an integer. Handle leading/trailing whitespaces, signs, and overflow.

11. **Find Longest Substring Without Repeating Characters:**
    * Given a string `s`, find the length of the longest substring without repeating characters.
    * *Example:* "abcabcbb" -> 3 ("abc"), "bbbbb" -> 1 ("b")

12. **Permutations of a String:**
    * Given a string, generate all possible permutations (arrangements) of its characters.
    * *Example:* "abc" -> "abc", "acb", "bac", "bca", "cab", "cba"

13. **Count Vowels and Consonants:**
    * Given a string, count the number of vowels and consonants.

---

## Advanced Questions (May involve dynamic programming, complex patterns, or specialized algorithms)

14. **Minimum Window Substring:**
    * Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.
    * *Example:* `s = "ADOBECODEBANC"`, `t = "ABC"` -> "BANC"

15. **Text Justification:**
    * Given an array of words and a maximum width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully (left and right) justified.

16. **Longest Common Subsequence (LCS):**
    * Given two strings `text1` and `text2`, return the length of their longest common subsequence.
    * *Example:* `text1 = "abcde"`, `text2 = "ace"` -> 3 ("ace")

17. **Wildcard Matching:**
    * Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for '?' (matches any single character) and '*' (matches any sequence of characters including the empty sequence).

18. **Regular Expression Matching:**
    * Implement regular expression matching with support for '.' (matches any single character) and '*' (matches zero or more of the preceding element).

---

## Tips for Answering String Questions:

* **Understand String Immutability:** In many languages (like Python, Java, JavaScript), strings are immutable. This means operations often create new strings, which can affect performance and memory.
* **Edge Cases:** Always consider empty strings, single-character strings, strings with special characters, very long strings, and strings with all identical characters.
* **Data Structures:** Think about using HashMaps/HashSets (or JavaScript objects/Maps) for character counts, frequencies, or seen characters. Stacks are useful for parentheses matching.
* **Two Pointers:** Many string problems can be efficiently solved using a two-pointer approach (e.g., palindrome check, reversing).
* **Sliding Window:** For substring-related problems (like longest substring without repeating characters, minimum window substring), the sliding window technique is very powerful.
* **Recursion/Backtracking:** For permutations or combinations.
* **Dynamic Programming:** For optimization problems like longest palindromic substring or longest common subsequence.
* **Time and Space Complexity:** Always analyze and discuss the time and space complexity of your solution.

---