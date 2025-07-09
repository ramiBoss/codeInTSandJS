class TreeNode {
    public value: number;
    public children: TreeNode[];
    constructor(value: number) {
        this.value = value;
        this.children = [];
    }
}

const DFS = (node: TreeNode, visited: TreeNode[]): void => {
    if(!node || visited.includes(node)) {
        return;
    }
    visited.push(node);
    
    console.log(node.value); // Process the node (e.g., print its value)
    for(const child of node.children) {
        DFS(child, visited);
    }
}

const DFS2 = (node: TreeNode, visited: Set<TreeNode>): void => {
    if(!node || visited.has(node)) {
        return;
    }
    visited.add(node);

    console.log(node.value); // Process the node (e.g., print its value)
    for(const child of node.children) {
        DFS2(child, visited);
    }
}


const node1 = new TreeNode(1);
const node2 = new TreeNode(2);
const node3 = new TreeNode(3);
const node4 = new TreeNode(4);
const node5 = new TreeNode(5);

node1.children.push(node2, node3);
node2.children.push(node4, node5);

console.log("DFS Traversal:");
const visited: TreeNode[] = [];
DFS(node1, visited);
console.log("Visited nodes:", visited.map(node => node.value));

console.log("DFS2 Traversal:");
const visitedSet: Set<TreeNode> = new Set();
DFS2(node1, visitedSet);
console.log("Visited nodes:", Array.from(visitedSet).map(node => node.value));

