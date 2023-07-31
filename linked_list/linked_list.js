class Node {
    value;
    next;
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

/*
linked list operations
push
pop
insert
remove
reverse
*/


class LinkedList {
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
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        return this.head;
    }

    pop(){
        let prev = this.head, temp = this.head;
        if(this.head === null){
            return 'underflow';
        }
        while(temp.next){
            prev = temp;
            temp = temp.next;
        }
        this.tail = prev;
        this.tail.next = null;
        return this.head;
    }

    insert(value, index){
        const newNode = new Node(value)
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
            return this.head;
        }
        let temp = this.head;
        index= index-1;
        while(temp.next && index > 0){
            temp = temp.next;
            index--;
        }
        if(index !== 0){
            this.tail.next = newNode;
            this.tail = newNode;
        }else {
            newNode.next = temp.next;
            temp.next = newNode;
        }
    }


}


const llist = new LinkedList(2);