const map = new Map();
const jump = (nums) => {
    if(nums.length === 1){
        return true;
    }
    map.clear();
    return jumpRecurse(0,nums);
}


const jumpRecurse = (index, nums) => {
    if(index === nums.length-1){
        return true;
    }
    if(map.has(index)){
        return map.get(index);
    }
    let steps = nums[index];
    if(steps === 0){
        map.set(index, false)
        return false;
    }
    for(let j = steps; j > 0; j--){
        if(jumpRecurse(index+j, nums)){
            map.set(index+j, true)
            return true;
        }
    }
    map.set(index, false);
    return false;
}

const test1 = [1,0,1,0]
const test2 = [3,2,1,0,4]

console.log(jump(test1))
console.log(jump(test2))