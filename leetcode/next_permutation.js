var nextPermutations = function(nums){
    if(nums.length === 1){
        return nums;
    }
    let i = nums.length-1; 
    while(i >= 0){
        if(i > 0 && nums[i-1] < nums[i]){
            break;
        }
        i--;
    }
    nums = nums.sort((a, b, index) => {
        console.log(a, b, index)
        return a-b
    });
    if(i > 0){
        const searchItem = nums[i-1]
        let found = nums[i];
        let foundIndex = i;
        for(let j = i+1; j < nums.length; j++){
            if(nums[j] > searchItem && nums[j] < found){
                found = nums[j];
                foundIndex = j;
            }   
        }
        nums[foundIndex] = searchItem;
        nums[i-1] = found;
    }
    return nums;
}


const test1 = [1,2,3];
const test2 = [3,2,1];
const test3 = [1,1,5];

console.log(nextPermutations(test1))
console.log(nextPermutations(test2))
console.log(nextPermutations(test3))