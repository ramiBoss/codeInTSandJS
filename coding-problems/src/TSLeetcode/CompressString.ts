/**
 * Compresses a string by counting consecutive repeated characters.
 * If the compressed string is not smaller than the original string, returns the original string.
 * Example: 'aabcccccaaa' -> 'a2b1c5a3'
 * 
 * @param str - The input string to be compressed
 * @returns The compressed string if it's shorter than the input, otherwise returns the original string
 * @example
 * compressString('aabcccccaaa') // returns 'a2b1c5a3'
 * compressString('ab') // returns 'ab'
 * compressString('') // returns ''
 */
function compressString(str: string): string {
  if (!str.length) return str;

  let compressed: string[] = [];
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      compressed.push(str[i - 1]);
      compressed.push(count.toString());
      count = 1;
    }
  }

  let result = compressed.join('');
  return result.length < str.length ? result : str;
}