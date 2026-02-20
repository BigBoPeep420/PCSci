class Node {
  constructor(value = null) {
    this.clear();
    this.value = value;
  }

  clear() {
    this.value = null;
    this.left = null;
    this.right = null;
  }
}

class BST {
  #root;

  constructor(initialValues = []) {
    this.#root = null;
    if (initialValues) {
      const sortedArr = this.#sortArray([...new Set(initialValues)]);
      this.#root = this.#buildTree(sortedArr, 0, sortedArr.length - 1);
    }
  }

  #buildTree(array, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);
    return root;
  }

  #sortArray(array) {
    return array.sort((a, b) => {
      if (a < b) return -1;
      if (b > a) return 1;
      return 0;
    });
  }

  #successor(node) {
    node = node.right;
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  #branchHeight(node, checkBalance = false) {
    if (!node) return -1;

    const left = this.#branchHeight(node.left, checkBalance);
    if (checkBalance && left === -Infinity) return -Infinity;

    const right = this.#branchHeight(node.right, checkBalance);
    if (checkBalance && right === -Infinity) return -Infinity;

    if (checkBalance && Math.abs(left - right) > 1) return -Infinity;

    return Math.max(left, right) + 1;
  }

  reset(array = []) {
    if (!array) this.#root = null;
    else {
      const sortedArr = this.#sortArray([...new Set(array)]);
      this.#root = this.#buildTree(sortedArr, 0, sortedArr.length - 1);
    }
  }

  includes(value) {
    let currentNode = this.#root;
    while (currentNode) {
      if (currentNode.value === value) return true;
      else {
        currentNode =
          value < currentNode.value ? currentNode.left : currentNode.right;
      }
    }
    return false;
  }

  insert(value) {
    const insert = (value, node) => {
      if (node === null) return new Node(value);
      else if (node.value === value) return node;

      if (value < node.value) node.left = insert(value, node.left);
      else node.right = insert(value, node.right);
      return node;
    };
    insert(value, this.#root);
  }

  delete(value) {
    const del = (value, node) => {
      if (node === null) return node;

      if (node.value > value) node.left = del(value, node.left);
      else if (node.value < value) node.right = del(value, node.right);
      else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const succ = this.#successor(node);
        node.value = succ.value;
        node.right = del(succ.value, node.right);
      }

      return node;
    };

    del(value, this.#root);
  }

  forEachLevelOrder(callback) {
    if (!callback)
      throw new Error(`BST.forEachLevelOrder: Must provide callback function`);

    if (!this.#root) return;

    const q = [this.#root];
    while (q.length > 0) {
      const currentNode = q.shift();
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
      callback(currentNode.value);
    }
  }

  forEachInOrder(callback) {
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      callback(node.value);
      traverse(node.right);
    };
    traverse(this.#root);
  }

  forEachPreOrder(callback) {
    const traverse = (node) => {
      if (!node) return;
      callback(node.value);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.#root);
  }

  forEachPostOrder(callback) {
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.value);
    };
    traverse(this.#root);
  }

  height(value) {
    let currentNode = this.#root;
    while (currentNode) {
      if (currentNode.value === value) break;
      currentNode =
        value < currentNode.value ? currentNode.left : currentNode.right;
    }
    if (!currentNode) return undefined;

    return this.#branchHeight(currentNode);
  }

  depth(value) {
    let depth = -1;
    let currentNode = this.#root;
    while (currentNode) {
      if (currentNode.value === value) return depth + 1;
      currentNode =
        value < currentNode.value ? currentNode.left : currentNode.right;
      depth++;
    }
  }

  isBalanced() {
    return this.#branchHeight(this.#root, true) !== -Infinity;
  }

  rebalance() {
    const newArr = [];
    this.forEachInOrder((value) => {
      newArr.push(value);
    });
    this.#root = this.#buildTree(newArr, 0, newArr.length - 1);
  }

  logTree() {
    const printTree = (node = this.#root, prefix = "", isLeft = true) => {
      if (node === null || node === undefined) return;
      printTree(node.right, `${prefix}${isLeft ? "|   " : "   "}`, false);
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    };

    printTree();
  }

  treeToString() {
    let output = [];
    const printTree = (node = this.#root, prefix = "", isLeft = true) => {
      if (node === null || node === undefined) return;
      printTree(node.right, `${prefix}${isLeft ? "|   " : "   "}`, false);
      output.push(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    };
    printTree();

    return output;
  }
}

export { BST };
