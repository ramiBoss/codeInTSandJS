/* Solving the cut rod problem with three approaches
1: Recursive solution
2: dynamic programming: Top-down approache
3: dynamic programming: Bottom-up approache
*/

//simple recursive solution
const cutRod = (n) => {
    if(n === 0){
        return 0;
    }
    let max = Number.MIN_VALUE;
    for(let i = 0; i < n; i++){
        max = Math.max(max, priceList[i] + cutRod(n-lengthList[i]));
    }
    return max;
}

//dynamic programming solution with top-down approach
const memo = [];
const cutRodDP = (n) => {
    if(n === 0){
        return 0;
    }
    console.log('n: ' + n + ' memo: ' + memo[n])
    if(memo[n]){
        return memo[n]
    }
    let max = Number.MIN_VALUE;
    for(let i = 0; i < n; i++){
        max = Math.max(max, priceList[i] + cutRodDP(n-lengthList[i]));
    }
    memo[n] = max;
    return max;
}



const priceList = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
const lengthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// console.log(cutRod(4));
console.log(cutRodDP(4));