

function rotateRight(array, k){
  let arr = array.splice(0, array.length-k);
  return array.concat(arr);
}

function rotateLeft(array, k){
  let arr = array.splice(0, k);
  return array.concat(arr);
}

function main(){
  let array = [1, 2, 3, 4, 5, 6, 7];
  console.log("Initial Array: " + array);
  console.log(rotateRight(array, 3));
  array = [1, 2, 3, 4, 5, 6, 7];
  console.log(rotateLeft(array, 3));
}

main()
