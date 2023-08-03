class Node {
    value;
    prev;
    next;
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    head;
    tail;
    constructor(value){
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
    }

    push(value){
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        return this.head;
    }

    pop(){
        if(!this.head){
            return 'underflow';
        }
        if(!this.head.next){
            this.head = null;
            this.tail = null;
            return this.head;
        }
        this.tail = this.tail.prev;
        this.tail.next = null;
        return this.head;
    }

    insert(value, index){
        if(!this.head){
            return 'underflow';
        }
        const temp = this.head;
        index--;
        while(!temp.next && index > 0){
            temp = temp.next;
            index--;
        }
        if(index > 0){
            return 'position not found';
        }
        const newNode = new Node(value);
        if(!temp.next){
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            newNode.next = temp.next;
            newNode.prev= temp;
            temp.next = newNode;
            newNode.next.prev = newNode;
        }
        return this.head;
    }
}