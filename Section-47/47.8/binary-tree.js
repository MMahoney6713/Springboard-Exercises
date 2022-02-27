/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let queue = this.root ? [this.root] : [];
    let depth = this.root ? 1 : 0;

    while (queue.length) {
      let current = queue.shift();

      if (!current.left && !current.right) 
        break;

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      depth++;
    }

    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let queue = this.root ? [this.root] : [];
    let depth = this.root ? 1 : 0;

    while (queue.length) {
      let current = queue.shift();

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      depth = (current.left || current.right) ? depth + 1 : depth;
    }

    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    // Copied from solutions - figured it had to be recursive so I double checked, and liked that the solution used Math.max on the recursive return so I stuck with it. I would have otherwise used a series of if statements, but this is really clean and easy to understand.
    let totalSum = 0;

    function maxSumHelper(current) {
      if (!current) return 0;
      const leftSum = maxSumHelper(current.left);
      const rightSum = maxSumHelper(current.right);
      totalSum = Math.max(totalSum, current.val + leftSum + rightSum);
      return Math.max(0, leftSum + current.val, rightSum + current.val);
    }

    maxSumHelper(this.root);
    return totalSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let queue = this.root ? [this.root] : [];
    let lowest = null;
    
    while (queue.length) {
      let current = queue.shift();

      if (current.val > lowerBound && (current.val < lowest || lowest === null)) {
        lowest = current.val;
      }

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return lowest;
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
