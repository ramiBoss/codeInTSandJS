// 1... 10 numbers non-consecutive but one number is missing, find the missing number

function generateRandomSizedArray(){
  let size = 5+Math.floor(Math.random()*10);
  // console.log("size: " + size);
  let flag=1, i=0, number=0;
  let array = [];
  while(i<size-1){
    number++;
    if(flag){
      // console.log("flag: " + flag);
      flag = Math.round(Math.random());
      if(flag == 0){
        // console.log("skipped: " + (i+1));
        continue;
      }
    }
    array[i] = number;
    i++;
  }
  // console.log("array size: " + array.length);
  return array;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function findMissing(array){
  let nCount = array.length+2;
  let ideal = nCount*((nCount-1)/2);
  let actualSum=0;
  for (let i=0; i< array.length; i++) {
    actualSum = actualSum+array[i];
  }
  // console.log(ideal);
  // console.log(actualSum);
  return ideal - actualSum;
}

function main(){
  // let array = [1, 2, 3, 4, 5, 7, 8, 9, 10]
  let array = generateRandomSizedArray();
  // console.log(array);
  shuffle(array);
  // console.log(array);
  console.log("the missing number: " + findMissing(array));
}

main();
