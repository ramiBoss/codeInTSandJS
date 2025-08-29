function knapsackP(W, wt, price, n){
  if(n<0)
    return 0;
  let res=0;
  if(wt[n] > W){
    res = knapsackP(W, wt, price, n-1);
  }else{
    res = Math.max(knapsackP(W, wt, price, n-1), knapsackP(W-wt[n], wt, price, n-1)+price[n]);
  }
  return res;
}

function main(){
  let price = [60, 100, 120];
  let wt = [10, 20, 30];
  let W = 50;
  console.log(knapsackP(W, wt, price, price.length-1));
}

main();
