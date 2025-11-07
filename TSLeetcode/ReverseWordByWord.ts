// Reverse a string word by word

const reverseWords = (s: string): string => {
    // Split the string by spaces, filter out empty strings, and reverse the array
    return s.split(' ')
            .filter(word => word.length > 0)
            .reverse()
            .join(' ');
}

// Reverse the words in a given string with in-built methods
const reverseWordsInPlace = (s: string): string => {
    let result = '';
    let word = '';
    let words: string[] = [];
    
    // Build words array manually
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ' ') {
            word += s[i];
        } else if (word) {
            words.push(word);
            word = '';
        }
    }
    // Add last word if exists
    if (word) {
        words.push(word);
    }
    
    // Reverse array manually
    for (let i = words.length - 1; i >= 0; i--) {
        result += words[i];
        if (i > 0) result += ' ';
    }
    
    return result;
}