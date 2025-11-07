
/**
 * Clone Graph 
 * https://leetcode.com/problems/clone-graph/
 * 
 * Example 1: 
 * 
 */


class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
}

function cloneGraph(node: Node | null): Node | null {
    if (!node) return null;
    const map = new Map<Node, Node>();

    function dfs(n: Node): Node {
        if (map.has(n)) {
            return map.get(n)!;
        }

        const clone = new Node(n.val);
        map.set(n, clone);

        for (const neighbor of n.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

export { cloneGraph, Node };