var mergeTwoList = function(list1, list2){
    let temp1 = list1;
    let temp2 = list2;
    let prev = null;

    if(list1 === null && list2 === null){
        return null
    }

    if(list1 === null || list2 === null){
        return list1 === null ? list2 : list1;
    }

    while(temp1 !== null && temp2 !== null){
        if(temp1.val <= temp2.val){
            prev = temp1;
            temp1 = temp1.next;
        } else if(temp1.val > temp2.val){
            let temp = temp2.next;
            if(prev === null){
                temp2.next = temp1;
                list1 = temp2;
            } else {
                prev.next = temp2;
                temp2.next = temp1;
            }
            prev = temp2;
            temp2 = temp;
        }
    }
    if(temp1 === null){
        prev.next = temp2;
    } else {
        while(temp1.next !== null) {
            temp1 = temp1.next;
        }
        temp1.next = temp2;
    }
    return list1;
}