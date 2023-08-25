const keypad = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
const phoneCombinations = (digits) => {
    if(digits.length === 0){
        return [];
    }
    const set = [];
    combinationRecurse('', 0, digits, set);
    return set;
}

const combinationRecurse = (strSet, digit_index, digits, set) => {
    if(digit_index === digits.length){
        set.push(strSet);
        return;
    }
    const this_digit_chars = keypad[digits[digit_index]];
    for(let i = 0; i < this_digit_chars.length; i++){
        combinationRecurse(strSet + this_digit_chars[i], digit_index+1, digits, set);
    }
    return;
}

const test1 = '2345';
const test2 = '';
const test3 = '2';
console.log(phoneCombinations(test1))
console.log(phoneCombinations(test2))
console.log(phoneCombinations(test3))