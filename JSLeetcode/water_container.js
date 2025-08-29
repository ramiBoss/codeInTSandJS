/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let i=0, j=height.length-1;
    let max=0, cur_max=0, start=i, end=j;
    while(i<j){
        cur_max = Math.min(height[i], height[j])*(j-i);
        if(cur_max > max){
            max=cur_max;
            start = i;
            end = j;
        }
        if(height[i] < height[j]){
            i++;
        }else if(height[j] < height[i]){
            j--;
        }else{
            i++;
            j--;
        }
    }
    console.log("start: " + start + " end " + end);
    return max;
};


function main(){
  let height = [1,9,6,2,5,4,2,3,1];
  console.log(maxArea(height));
}

main();
