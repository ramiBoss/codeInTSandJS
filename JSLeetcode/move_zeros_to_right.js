// more the zeros in the array to the right if the array keeping the remaining of the array inorder
// not using .filter
let zerosToRight = function(array){
    let start=0, end=array.length-1;
    let newArray=[];
    for(let i=0; i<array.length; i++){
      if(array[i] == 0){
        newArray[end] =0;
        end--;
      }else{
        newArray[start] = array[i];
        start++;
      }
    }
    return newArray;
}

function main(){
  let array = [0, 1, 2, 23, 1, 0, 6];
  console.log("initial array: " + array);
  console.log("final array: " + zerosToRight(array));
}

main();
