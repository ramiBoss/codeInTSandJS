const reomveNthFromLast = (head, n) => {
    if(head.next === null && n === 1){
        return null;
    }
    let temp1 = head;
    let temp2 = head;
    let i = n;
    while(i > 0){
        temp1 = temp1.next;
        i--;
    }
    if(temp1 === null){
        head = temp2.next;
        return head;
    }
    while(temp1.next !== null){
        temp2 = temp2.next;
        temp1 = temp1.next;
    }
    temp2.next = temp2.next.next;
    return head;
}