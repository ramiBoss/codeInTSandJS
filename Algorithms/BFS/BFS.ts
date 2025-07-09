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
    const queue = new Queue(); // Or a built-in Array acting as a queue
    const visited = new Set<BFSNode>(); // Use a Set for O(1) average lookup

    queue.push(startNode);
    visited.add(startNode); // Mark start node as visited immediately

    const traversalOrder: number[] = []; // To store the order of visited nodes

    while (!queue.isEmpty()) {
        const currentNode = queue.pop();

        if (currentNode) { // Should always be true if queue is not empty
            traversalOrder.push(currentNode.value); // Process the node

            for (const child of currentNode.children) {
                if (!visited.has(child)) { // CRITICAL: Check if not visited before adding to queue
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
