const matrix = [
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1]
];

function build_zero_matrix(){
    // const arr = [];
    let map = new Map();
    if(matrix.length === 0){
        return matrix;
    }
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[0].length; j++){
            if(matrix[i][j] === 0){
                map.set(i, true);
            }
        }
    }
    console.log(map)
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[0].length; j++){
            if(map.get(i) || map.get(j)){
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;
}


console.log(build_zero_matrix())