const isGood = (nums) => {
    if(nums.length < 2){
        return false;
    }
    let map = new Map();
    let n = nums.length-1;
    let getNum = undefined;
    for(let i = 0; i <= n; i++){
        getNum = map.get(nums[i]) 
        getNum = getNum ? getNum : 0;
        if((getNum && nums[i] != n) || nums[i] > n){
            return false;
        } else if(getNum > 1){
            return false;
        }
        map.set(nums[i], getNum + 1);
    }
    return map.get(n) == 2 ? true : false;
}

const test1 = [2, 1, 3];
const test2 = [1, 3, 3, 2]
const test3 = [3, 4, 1, 2, 1]
const test4 = [14, 2, 2]

console.log(isGood(test1))
console.log(isGood(test2))
console.log(isGood(test3))
console.log(isGood(test4))