const strStr = (haystack, needle) => {
    if(haystack.length <= needle.length){
        return haystack === needle ? 0 : -1;
    }
    let i = 0;
    let sub;
    let len = haystack.length-needle.length+1;
    while(i<=len){
        if(haystack[i] === needle[0]){
            sub = haystack.substring(i, i+needle.length);
            if(sub === needle){
                return i;
            }
            i++;
        }else{
            i++;
        }
    }
    return -1;
}

console.log(strStr('butsad', 'sad'))
console.log(strStr('leetcode', 'leeto'))
console.log(strStr('mississippi', 'pi'))
console.log(strStr('oookok', 'koko'))