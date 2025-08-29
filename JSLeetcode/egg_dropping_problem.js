// Author: ramiBoss
function eggProblemdp(){
  let dp = [eggs.length][floors.length];

  for(let i=0; i<=eggs; i++){
    dp[i][1] = 1;
    dp[i][0] = 0;
  }

  for()
}

function eggProblem(eggs, floors){
  if(floors == 0 || floors == 1)
    return floors;

  if( eggs == 1)
    return floors;

  let min = Number.MAX_VALUE;
  for(let i=2; i<=floors; i++){
    let res = Math.max(eggProblem(eggs-1, i-1), eggProblem(eggs, floors-i));
    if(res < min){
      min = res;
    }
  }

  return min+1;
}

function main(){
  console.log(eggProblem(2, 10));
}

main();
