// Longest substring without repeating

const lengthOfLongestSubstring = (s) => {
    let max = 0;
    let set = new Set();
    for(let i = 0; i < s.length-max; i++){
        set.add(s[i]);
        for(let j = i+1; j < s.length; j++){
            if(set.has(s[j])){
                j = s.length;
            } else {
                set.add(s[j])
            }
        }
        max = set.size > max ? set.size : max;
        set.clear();
    }
    return max;
}

var lengthOfLongestSubstring2 = function(s){
    if(s.length === 0){
        return 0;
    } 
    if(s.length === 1){
        return 1;
    }
    let max = 0;
    let set = new Set();
    let left = 0;
    let right = 1;
    while(left < s.length-max){
        set.add(s[left]);
        while(set.has(s[right]) && right > left){
            set.delete(s[right])
            right--;
        }
        while(right < s.length && !set.has(s[right])){
            set.add(s[right])
            right++;
        }
        max = set.size > max ? set.size : max;
        set.delete(s[left]);
        left++;
    }
    return max;
}

const test1 = 'abcabcbb'
const test2 = 'bbbbb'
const test3 = 'bbcbacba'
const test4 = 'a'
const test5 = ''

console.log(lengthOfLongestSubstring2(test1))
console.log(lengthOfLongestSubstring2(test2))
console.log(lengthOfLongestSubstring2(test3))
console.log(lengthOfLongestSubstring2(test4))
console.log(lengthOfLongestSubstring2(test5))