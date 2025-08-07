class BFSNode {
	public value: number;
	public children: BFSNode[];

	constructor(value: number) {
		this.value = value;
		this.children = []
	}
}

class Queue {
	private contents: BFSNode[] = [];

	push(node: BFSNode): void {
		this.contents.push(node);
	}

	pop(): BFSNode | undefined {
		return this.contents.shift();
	}

	isEmpty(): boolean {
		return this.contents.length === 0;
	}
}

const BFS = (startNode: BFSNode) => {
    const queue = new Queue(); 
    const visited = new Set<BFSNode>(); 

    queue.push(startNode);
    visited.add(startNode); 

    const traversalOrder: number[] = []; 

    while (!queue.isEmpty()) {
        const currentNode = queue.pop();

        if (currentNode) { 
            traversalOrder.push(currentNode.value); 

            for (const child of currentNode.children) {
                if (!visited.has(child)) { 
                    visited.add(child);
                    queue.push(child);
                }
            }
        }
    }
    return traversalOrder;
};

const bfsNode1 = new BFSNode(1);
const bfsNode2 = new BFSNode(2);
const bfsNode3 = new BFSNode(3);
const bfsNode4 = new BFSNode(4);
const bfsNode5 = new BFSNode(5);
const bfsNode6 = new BFSNode(6);

bfsNode1.children.push(bfsNode2, bfsNode3);
bfsNode2.children.push(bfsNode4, bfsNode5);
bfsNode3.children.push(bfsNode6);

const result = BFS(bfsNode1);
console.log(result);
