const start = [1, 3, 0, 5, 3, 5, 6, 8, 8, 2, 12];
const finish = [4, 5, 6, 7, 9, 9, 10, 11, 12, 14, 16]

const activitySelection = () => {
    if(start.length !== finish.length){
        return 'Wrong data supplied';
    }
    const selected = [];
    selected[0] = { start: start[0], finish: finish[0] };
    let k = 1;
    for(let i = 1; i < finish.length; i++){
        if(start[i] >= selected[k-1].finish){
            selected[k] = { start: start[i], finish: finish[i] };
            k++; 
        }
    }
    return selected;
}

console.log(activitySelection());