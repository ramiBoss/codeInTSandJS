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
    head = null;
    tail = null;
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

    remove(value){
        if(!this.head){
            return 'underflow'
        }
        if(this.head.value === value){
            if(this.head.next === null){
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
            }
            return this.head;
        }
        let temp = this.head;
        while(temp){
            if(temp.next.value === value){
                temp.next = temp.next.next;
                return this.head;
            }
            temp = temp.next;
        }
        return 'Node not found'
    }

    recurse(prev, temp){
        if(!temp){
            return;
        }
       this.recurse(temp, temp.next);
        temp.next = prev;
        return temp;
    }

    reverse(){
        if(!this.head || !this.head.next){
            return this.head;
        }
        let temp = this.head;
        let temp2 = this.recurse(temp, temp)
        temp2.next = null;
        this.head = this.tail;
        this.tail = temp2;
    }


}


let llist = new LinkedList(1);
llist.push(2);
llist.push(3);
llist.push(4);
llist.push(5);
llist.push(6);
console.log(JSON.stringify(llist))
// llist.reverse();
llist.remove(1)
console.log(JSON.stringify(llist))