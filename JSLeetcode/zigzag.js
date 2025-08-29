var convert = function(s, numRows) {
    if(s.length <= 2 || numRows <= 1){
        return s;
    }
    const arrList = [];
    let i = 0;
    let dir = 0;
    let row = 0
    while(i<s.length){
        if(dir === 1){
            row--;
            if(row !== 0){
                arrList[row] = arrList[row] ? arrList[row] + s[i] : s[i];
            } else {
                dir = 0;
            }
        }
        if(dir === 0){
            arrList[row] = arrList[row] ? arrList[row] + s[i] : s[i];
            row++;
            if(row === numRows){
                row--;
                dir = 1;
            }
        }
        i++;
    }
   return arrList.reduce((fStr, arr) => fStr + arr, '')
};

const test1 = "PAYPALISHIRING";
console.log(convert(test1, 3))
console.log(convert('', 3))