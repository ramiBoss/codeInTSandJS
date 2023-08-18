const memo = [];
const climbStairs = (n) => {
    if(n <= 1){
        return 1;
    }
    if(memo[n]){
        return memo[n];
    }
    memo[n] = climbStairs(n-1) + climbStairs(n-2);
    return memo[n]
}

// console.log(climbStairs(45))

const climbStairsBU = (n) => {
    const memo = [];
    memo[0] = 1;
    memo[1] = 1;
    for(let i = 2; i <= n; i++){
        memo[i] = memo[i-1] + memo[i-2];
    }
    console.log(memo)
    return memo[n]
}

console.log(climbStairsBU(3))
