const maxPalindromeSubstring = (s) => {
    const sLen = s.length;
    if(sLen <= 1){
        return 0;
    }
    let sMatrix = [];
    for(let i = 0; i < sLen; i++){
        let arr = [];
        for(let j = 0; j < sLen; j++){
            if(j === i){
                arr[j] = 1;
            } else {
                arr[j] = 0;
            }
        }
        sMatrix[i]= arr;
    }
    for(let i = 1; i < sLen; i++){
        let j = 0;
        while(j < sLen-i){
            let k = j+i;
            if(s[j] === s[j + i]){
                sMatrix[j][k] = sMatrix[j+1][k-1] + 2; 
            } else {
                sMatrix[j][k] = sMatrix[j][k-1]; 
            }
            j++;
        }
    }
    let max = sMatrix[0][sLen-1]
    let maxString = [];
    for(let i = 1; i < sLen; i++){
        if(sMatrix[i][sLen-1] > max){
            max = sMatrix[i][sLen-1];
        }
    }
    if(max === 1){
        return 0;
    }
    for(let i = 0; i < sLen; i++){
        if(sMatrix[i][sLen-1] === max){
            for(let j = sLen-1; j >= i; j--){
                if(sMatrix[i][j] < max){
                    maxString.push(s.substring(i, j+2));
                    j = -1;
                }
           }   
        }
    }
    return maxString;
}

console.log(maxPalindromeSubstring('babad'));
console.log(maxPalindromeSubstring('bbaaab'));
