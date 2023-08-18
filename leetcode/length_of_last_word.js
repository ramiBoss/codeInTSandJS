const lengthOfLastWord = (s) => {
    let wordArray = s.split(' ');
    wordArray = wordArray.filter(word => word !== '');
    const lastWord = wordArray[wordArray.length-1];
    return lastWord.length;
}

const test1 = "Hello Word";
const test2 = " fly me  to  the moon  ";
console.log(lengthOfLastWord(test1));
console.log(lengthOfLastWord(test2));