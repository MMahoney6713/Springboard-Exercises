class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val)

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current=this.root) {
    const newNode = new Node(val)

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = newNode;;
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (!current.right) {
        current.right = newNode;
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (current.val === val) 
        return current;

      current = val < current.val
                ? current.left
                : current.right;
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (val < current.val) {
      if (!current.left) return undefined;
      return this.findRecursively(val, current.left);
    } else if (val > current.val) {
      if (!current.right) return undefined;
      return this.findRecursively(val, current.right);
    }
    return current;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let traverseData = [];
    let current = this.root;

    function traverse(current) {
      traverseData.push(current.val)
      if (current.left) traverse(current.left);
      if (current.right) traverse(current.right);
    }
    traverse(current)
    return traverseData;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let traverseData = [];
    let current = this.root;

    function traverse(current) {
      if (current.left) traverse(current.left);
      traverseData.push(current.val)
      if (current.right) traverse(current.right);
    }
    traverse(current)
    return traverseData;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let traverseData = [];
    let current = this.root;

    function traverse(current) {
      if (current.left) traverse(current.left);
      if (current.right) traverse(current.right);
      traverseData.push(current.val)
    }
    traverse(current)
    return traverseData;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    // Copied from solution, as I didn't realize what a BFS was at first!
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  // remove(val) {

  // }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  // isBalanced() {

  // }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  // findSecondHighest() {
    
  // }
}

module.exports = BinarySearchTree;
