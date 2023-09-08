const swapPairs = (head) => {
    if(head === null || head.next === null){
        return head;
    }
    return swapRecurse(head, head.next)
}

const swapRecurse = (firstNode, secondNode) => {
    if(firstNode === null){
        return null;
    }
    if(secondNode === null){
        return firstNode;
    }
    let previousHead = null;
    if(secondNode.next !== null){
       previousHead = swapRecurse(secondNode.next, secondNode.next.next);
    }
    firstNode.next = previousHead;
    secondNode.next = firstNode;
    return secondNode
}