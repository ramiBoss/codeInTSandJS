const threeSome = (arr) => {
    const map = new Map();
    const masterMap = new Map();
    const sum = 0;
    for(let i = 0; i < arr.length; i++){
        const tempArr = [];
        for(j = 0; j < arr.length; j++){
            if(j !== i){ 
                if(map.get(sum-arr[i]-arr[j])){
                tempArr.push([arr[i], arr[j], sum-arr[i]-arr[j]]);
                console.log(tempArr)
                }
                map.set(arr[j], j);
            }
        }
        tempArr.forEach(array => {
            const sorted = array.sort(function(a, b) { return a - b; });
            const key = ''+sorted[0]+sorted[1]+sorted[2];
            if(!masterMap.get(key)){
                masterMap.set(key, sorted);
            }
        })
        map.clear();
    }
    const res = masterMap.values();
    return res;
}

const test1 = [-1,0,1,2,-1,-4]
console.log(threeSome(test1))