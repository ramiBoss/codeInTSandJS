/** Invert a binary tree.
 * Example:
 * Input:
 *      4
 *    /   \
 *   2     7
 *  / \   / \
 * 1   3 6   9
 *
 * Output:
 *      4
 *    /   \
 *   7     2
 *  / \   / \
 * 9   6 3   1
 */ 

const invertTree = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null;

    // Swap the left and right children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Recursively invert the subtrees
    invertTree(root.left);
    invertTree(root.right);

    return root;
};
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {    
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}