const jump = (nums) => {
    console.time('time')
    const map = new Map();
    if(nums.length === 1){
        return true;
    }
    map.clear();
    const res = jumpRecurse(0,nums, map);
    console.timeEnd('time')
    return res;
}


const jumpRecurse = (index, nums, map) => {
    if(index === nums.length-1){
        return true;
    }
    if(map.has(index)){
        return map.get(index);
    }
    for(let j = nums[index]; j > 0; j--){
        if(nums[index+j] === 0 && (index+j) !== nums.length-1){
            map.set(index+j, false)
            return false;
        }
        if(jumpRecurse(index+j, nums, map)){
            map.set(index+j, true)
            return true;
        }
    }
    map.set(index, false);
    return false;
}

const test1 = [1,0,1,0]
const test2 = [3,2,1,0,4]
const test3 = [2,3,1,1,4]
const test4 = [2,0,6,9,8,4,5,0,8,9,1,2,9,6,8,8,0,6,3,1,2,2,1,2,6,5,3,1,2,2,6,4,2,4,3,0,0,0,3,8,2,4,0,1,2,0,1,4,6,5,8,0,7,9,3,4,6,6,5,8,9,3,4,3,7,0,4,9,0,9,8,4,3,0,7,7,1,9,1,9,4,9,0,1,9,5,7,7,1,5,8,2,8,2,6,8,2,2,7,5,1,7,9,6]

// console.log(jump(test1))
console.log(jump(test2))
console.log(jump(test3))
// console.log(jump(test4))