var twoSum = function(nums, target){
    let map = new Map();
    
    for(let i = 0; i< nums.length; i++){
        let remaining = target - nums[i];
        if(map.get(remaining) !== undefined){
            return [i, map.get(remaining)];
        }
        map.set(nums[i], i);
    }
}
const arr1 = [2, 7, 11, 15];
const arr2 = [3, 2, 4];
const arr3 = [3, 3];
console.log(twoSum(arr1, 9));
console.log(twoSum(arr2, 6));
console.log(twoSum(arr3, 6));