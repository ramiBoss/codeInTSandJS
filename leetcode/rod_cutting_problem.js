let lengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let prize = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

function rodCutting(len){
  if(len <= 0)
    return 0;
  let max = Number.MIN_VALUE;
  for(let i=0; i<len; i++){
    max = Math.max(max, prize[i]+rodCutting(len-i-1));
  }
  // if(len < index){
  //   return rodCutting(index-1, len);
  // }
  // if(len >= index){
  //     let max = Math.max(prize[index-1]+rodCutting(index-1, len-index), rodCutting(index-1, len));
  // }

  return max;
}

(function main(){
  let len = 4;
  console.log(rodCutting(4));
})();
