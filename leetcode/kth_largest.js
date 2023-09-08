const heap = [];

const heapPush = (key) => {
    
    if(heap.length === 0){
        heap.push(key);
        return;
    } 
    let index = 0;
    while(index < k && index < heap.length ){
            if(heap[index] < key){
                let temp = heap[index];
                heap[index] = key;
                key = temp;
            }
            let left = (2*index)+1
            let right = (2*index)+2
            index = heap[right] > heap[left] ? right : left;
    }
    heap[index] = key
}

const heapify = () => {
    for(let item of heap){
       heapPush(item)
    }
    return;
}

const kth_largest = (array, k) => {
    for(let i = 0; i < k; i++){
        heap.push(array[i]);
    }
    for(let i = k; i < array.length; i++){
        heapPush(array[i], k);
    }
    console.log(heap)
    return;
    //  heap[0]
}

const test1 = [3,2,1,5,6,4]
const test2 = [3,2,3,1,2,4,5,5,6]

console.log(kth_largest(test1, 2))
console.log(kth_largest(test2, 4))