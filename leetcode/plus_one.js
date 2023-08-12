const plusOne = (digits) => {
    let j = digits.length-1;
    while(j >=0){
        digits[j] = digits[j] + 1 == 10 ? 0 : digits[j] + 1;
        if(digits[j] != 0){
            break;
        }
        j--;
    }
    if(digits[0] == 0){
        digits.unshift(1);
    }
    return digits;
}

const test1 = [1, 2, 3];
const test2 = [9, 9, 9, 9]
const test3 = [4, 3, 9, 9]
const test4 = [9]

console.log(plusOne(test1))
console.log(plusOne(test2))
console.log(plusOne(test3))
console.log(plusOne(test4))