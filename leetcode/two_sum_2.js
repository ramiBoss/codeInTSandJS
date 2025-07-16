// two sum problem where the array is sorted

function twoSum(array, number){

  let i = 0, j= array.length-1;

  while(i<=j){
    // console.log(i + " " + j);
    if(array[i]+array[j] == number){
      return{
        i, j
      };
    }else if(array[i]+array[j] > number){
      j--;
    }else{
      i++;
    }
  }

  return "Numbers cannot be found";
}

function main(){
  let array = [2, 7, 11, 15];
  let number = 2;
  console.log(twoSum(array, number));
}

main();
