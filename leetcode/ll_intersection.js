var getIntersectionNode = function(headA, headB) {
    if(headA === null || headB === null){
        return null;
    }
    let tempA =  headA;
    let tempB =  headB;
    let lenA = 0
    let lenB = 0
    while(tempA.next !== null){
        lenA++;
        tempA = tempA.next;
    }
    while(tempB.next !== null){
        lenB++;
        tempB = tempB.next;
    }
    tempA =  headA;
    tempB =  headB;
    let freeRun = 0;
    if(lenB > lenA){
        freeRun = lenB - lenA;
        for(let i = 0; i < freeRun; i++){
            tempB = tempB.next;
        }
    }else if(lenA > lenB){
        freeRun = lenA - lenB;
        for(let i = 0; i < freeRun; i++){
            tempA = tempA.next;
        }
    }

    while(tempA !== tempB && tempA !== null && tempB !== null){
        tempA = tempA.next;
        tempB = tempB.next;
    }
    if(tempA === tempB){
        return tempA;
    }
    return null;
};