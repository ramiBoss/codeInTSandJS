// right view of a binary tree
function treeNode(val){
  this.val = val;
  this.right = null;
  this.left = null;
}

function rightView(root, level, max_level){
  if(root === null)
    return;
  if(max_level[0] < level){
    console.log(root.val);
    max_level[0] = level;
  }

  rightView(root.right, level+1, max_level);
  rightView(root.left, level+1, max_level);
}

function printTree(root){
  if(root === null)
    return;
  console.log(root.val);
  printTree(root.left);
  printTree(root.right);
}

function main(){
  let root = new treeNode(1);
  let two = new treeNode(2), three = new treeNode(3),four = new treeNode(4);
  let five = new treeNode(5), six = new treeNode(6), seven = new treeNode(7), eigth = new treeNode(8);

  root.left = two;
  root.right = three;
  two.left = four;
  two.right = five;
  three.left = six;
  three.right = seven;
  four.left = eigth;

  // printTree(root);
  let max_level = [0];
  rightView(root, 1, max_level);
}

main();
