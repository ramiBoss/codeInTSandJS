const reverseList = (head) => {
    
}

const reverse = (temp) => {
    if(temp.next === null){
        return temp;
    }
    const head = reverse(temp.next);
    let tempHead = head;
    while(tempHead.next !== null){
        tempHead = tempHead.next;
    }
    tempHead.next = temp;
    temp.next = null;
    return head
}