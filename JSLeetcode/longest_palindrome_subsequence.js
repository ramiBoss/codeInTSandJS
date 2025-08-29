// Author: ramiBoss

// longest palidrome subsequence
// L(0, n) = L(1, n-1) +2 if elements are equal
// L(0, n) = max(L(1, n), L(0, n-1))
let string = 'BBABCBCAB';

function lps(start, end){
    if(end - start <= 1)
      return 1;
    // let min = Number.MIN_VAULE;
    let res = 0;
    if(string.charAt(start) === string.charAt(end)){
      res = lps(start+1, end-1)+2;
    }else{
      res = Math.max(lps(start, end-1), lps(start+1, end));
    }

    return res;
}

function main(){
  let res = lps(0, string.length);
  console.log(res);
}

main();
