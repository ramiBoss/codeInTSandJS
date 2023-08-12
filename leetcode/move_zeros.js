const moveZeros = (nums) => {
  let len = nums.length;
  if(len <= 1){
    return nums;
  }
  let i = 0;
  let j = 1;
  let temp;
  while(i < len && j < len){
    if(nums[i] === 0){
        if(nums[j] !== 0){
            temp  = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            i++;
            j++;
        } else {
            j++;
        }
    } else{
        i++;
        j++;
    }
  }
  return nums;
}
const test1 = [0,1,2,2,3,0,4,2]
const test2 = [0,1,0, 3, 1, 2]
const test3 = [4,2,4,0,0,3,0,5,1,0]
const test4 = [2]
console.log(moveZeros(test1));
console.log(moveZeros(test2));
console.log(moveZeros(test3));
console.log(moveZeros(test4));