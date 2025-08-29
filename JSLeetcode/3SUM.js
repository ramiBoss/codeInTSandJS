const threeSome = (arr) => {
    const result = [];
    if(arr.length < 3) return result; // If less than 3 elements, no triplet can be formed

    // Sort the array to make it easier to find triplets
    arr.sort((a, b) => a-b);

    for(let i=0; i< arr.length-2; i++){
        // Skip duplicate elements to avoid duplicate triplets
        if(i > 0 && arr[i] === arr[i-1]) continue;

        let left = i + 1;
        let right = arr.length - 1;
        while(right < left){
            const sum = arr[i] + arr[left] + arr[right];
            if(sum === 0){
                result.push([arr[i], arr[left], arr[right]]);
                // Skip duplicate elements for left pointer
                while(left < right && arr[left] === arr[left + 1]) left++;
                // Skip duplicate elements for right pointer
                while(left < right && arr[right] === arr[right - 1]) right--;
                left++;
                right--;
            } else if(sum < 0){
                left++;
            } else {
                right--;
            }       
        }
    }
}

const test1 = [-1,0,1,2,-1,-4]
console.log(threeSome(test1))