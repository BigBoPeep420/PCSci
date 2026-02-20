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

  /**
   *
   * @param {array} initialValues - (Optional) Initial values to populate list with.
   */
  constructor(initialValues = []) {
    this.#root = null;
    if (initialValues) {
      const sortedArr = this.#sortArray([...new Set(initialValues)]);
      this.#root = this.#buildTree(sortedArr, 0, sortedArr.length - 1);
    }
  }

  /**
   * Recursive function to build binary tree from sorted array
   *
   * @param {array} array Initial data to populate tree
   * @param {number} start Array index to start with
   * @param {number} end Array index to end with
   * @returns Root node of finished tree
   */
  #buildTree(array, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);
    return root;
  }

  /**
   * Sorts an array by value
   * @param {array} array - Array to sort
   * @returns New Sorted Array
   */
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

  /**
   *
   * @param {array} array - (Optional) Array of new data to build from. If empty, tree resets to empty.
   */
  reset(array = []) {
    if (!array) this.#root = null;
    else {
      const sortedArr = this.#sortArray([...new Set(array)]);
      this.#root = this.#buildTree(sortedArr, 0, sortedArr.length - 1);
    }
  }

  /**
   * Searches tree for value and returns true or false
   * @param {*} value Value to search for
   * @returns True if found, false otherwise
   */
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

    const q = [this.#root];
    while (q.length > 0) {
      const currentNode = q.shift();
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
      return callback(currentNode.value);
    }

    q.forEach((node) => callback(node.value));
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
}

export { BST };
