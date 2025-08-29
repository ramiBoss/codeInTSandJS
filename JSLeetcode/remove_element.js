var removeElement = function(nums, val){
    if(nums.length === 0){
        return 0;
    }
    if(nums.length === 1) {
        return nums[0] !== val ? 1 : 0;
    }
    let i =0;
    let j = nums.length-1;
    let k =0;
    while(i < j){
        if(nums[j] === val){
            j--;
        }
        if(nums[i] === val){
            if(nums[j] !== val && j > i){
                let temp = nums[j];
                nums[j] = nums[i];
                nums[i] = temp;
                i++;
                j--;
                k++;
            }
        } else if(nums[i] !== val){
            i++;
            k++;
        }
    }
    if(i === j && nums[i] !== val){
        k++;
    }
    return k;
}
const test1 = [0,1,2,2,3,0,4,2]
const test2 = [1, 1, 2]
const test3 = []
const test4 = [2]
console.log(removeElement(test1, 2));
console.log(removeElement(test2, 2));
console.log(removeElement(test3, 1));
console.log(removeElement(test4, 2));