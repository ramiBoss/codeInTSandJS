/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    reverse(0,s);
};

var reverse = function(index, s){
    if(s === undefined || index > s.length-1){
        return;
    }
    let ch = s[index];
    reverse(index+1, s);
    s[(s.length-1)-index] = ch;
}

reverseString('hello'.split(''))