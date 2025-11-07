/**
 * Group Anagrams
 * Given an array of strings, group the anagrams together. You can return the answer in any order.
 *
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: 
 */


function groupAnagrams(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        // Create a frequency key by sorting characters
        // Alternative: use character frequency count as key
        const sortedKey = str.split('').sort().join('');
        
        if (anagramMap.has(sortedKey)) {
            anagramMap.get(sortedKey)!.push(str);
        } else {
            anagramMap.set(sortedKey, [str]);
        }
    }
    
    return Array.from(anagramMap.values());
}

// Alternative approach using character frequency as key
function groupAnagramsFrequency(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();
    
    for (const str of strs) {
        // Create frequency key
        const freqKey = getFrequencyKey(str);
        
        if (anagramMap.has(freqKey)) {
            anagramMap.get(freqKey)!.push(str);
        } else {
            anagramMap.set(freqKey, [str]);
        }
    }
    
    return Array.from(anagramMap.values());
}

function getFrequencyKey(str: string): string {
    const freq = new Array(26).fill(0);
    
    for (const char of str) {
        freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    return freq.join(',');
}

export { groupAnagrams, groupAnagramsFrequency };