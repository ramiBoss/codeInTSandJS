// Cycle Detection in a Graph

class Queue<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.shift();
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

interface Graph {
    getNodes(): BFSNode[];
}

interface BFSNode {
    children: BFSNode[];
}

/**
 * Detects cycles in an undirected graph using BFS.
 * @param graph - The graph to check for cycles.
 * @returns True if a cycle is detected, false otherwise.
 */
const detectCycle = (graph: Graph): boolean => {
    const visited = new Set<BFSNode>();
    const parentMap = new Map<BFSNode, BFSNode | null>();

    for (const node of graph.getNodes()) {
        if (!visited.has(node)) {
            const hasCycle = bfsDetectCycle(node, visited, parentMap);
            if (hasCycle) {
                return true;
            }
        }
    }
    return false;
};
/** * Helper function for BFS cycle detection.
 * @param node - The current node being visited.
 * @param visited - Set of visited nodes.
 * @param parentMap - Map to track parent nodes.
 * @returns True if a cycle is detected, false otherwise.
 */
const bfsDetectCycle = (node: BFSNode, visited: Set<BFSNode>, parentMap: Map<BFSNode, BFSNode | null>): boolean => {
    const queue = new Queue<BFSNode>();
    queue.push(node);
    visited.add(node);
    parentMap.set(node, null);

    while (!queue.isEmpty()) {
        const currentNode = queue.pop();
        if (currentNode) {
            for (const child of currentNode.children) {
                if (!visited.has(child)) {
                    visited.add(child);
                    parentMap.set(child, currentNode);
                    queue.push(child);
                } else if (parentMap.get(currentNode) !== child) {
                    // Cycle detected
                    return true;
                }
            }
        }
    }
    return false;
}