const swapPairs = (head) => {
    if(head === null || head.next === null){
        return head;
    }
    return swapRecurse(head, head.next)
}

const swapRecurse = (firstNode, secondNode) => {
    if(secondNode === null){
        return null;
    }
    const previousHead = swapRecurse(secondNode.next, secondNode.next.next);
    firstNode.next = previousHead;
    secondNode.next = firstNode;
    return secondNode
}