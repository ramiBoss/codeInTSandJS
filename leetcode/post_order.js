var postorderTraversal = function(root) {
    const postOrderArray = [];
    postOrder(root, postOrderArray);
    return postOrderArray;
};

const postOrder = (root, postOrderArray) => {
    if(root === null) {
        return
    }
    postOrder(root.left, postOrderArray);
    postOrder(root.right, postOrderArray);
    postOrderArray.push(root.val)
    return;
}