var removeDuplicates = function(nums){
    if(nums.length === 0){
        return 0;
    }
    if(nums.length === 1) {
        return 1;
    }
    let currentIndex = 0;
    let currentValue = nums[0];
    let k = 1; 
    let i = 1; 
    while(i < nums.length){
        if(nums[i] !== currentValue){
           if(currentIndex + 1 !== i){
            currentIndex = currentIndex+1;
            nums[currentIndex] = nums[i]
            }else{
                currentIndex++;
            }
            currentValue = nums[i];
            k++;
        }
        i++;
    }
    return k;
}
const test1 = [0,0,1,1,1,2,2,3,3,4]
const test2 = [1, 1, 2]
const test3 = []
const test4 = [2]
console.log(removeDuplicates(test1));
console.log(removeDuplicates(test2));
console.log(removeDuplicates(test3));
console.log(removeDuplicates(test4));