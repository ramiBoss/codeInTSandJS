
const RansomNote = (ransomNote: string, magazine: string): boolean => {
    const charCount: { [key: string]: number } = {};

    for (let char of magazine) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let char of ransomNote) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }

    return true;
}

export default RansomNote;