/**
 * Binary Tree Level Order Traversal
 * Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
 *
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 */

function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) return result;

    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!;
            currentLevel.push(currentNode.val);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        result.push(currentLevel);
    }
    return result;
}
