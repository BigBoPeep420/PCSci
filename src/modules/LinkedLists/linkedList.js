class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }

  clear() {
    this.value = undefined;
    this.nextNode = undefined;
  }
}

class LinkedList {
  #head;
  #tail;
  #length;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.#length === 0) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.nextNode = newNode;
      this.#tail = newNode;
    }
    this.#length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (this.#length === 0) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.nextNode = this.#head;
      this.#head = newNode;
    }
    this.#length++;
  }

  size() {
    return this.#length;
  }

  head() {
    if (this.#head) return this.#head.value;
    else return undefined;
  }

  tail() {
    if (this.#tail) return this.#tail.value;
    else return undefined;
  }

  at(index) {
    if (index === 0) return this.#head.value;
    else if (index === this.#length - 1) return this.#tail.value;
    else {
      let currentNode = this.#head;
      for (let i = 1; i < this.#length; i++) {
        currentNode = currentNode.nextNode;
        if (i === index) return currentNode.value;
      }
      return undefined;
    }
  }

  pop() {
    if (this.#length == 0) return undefined;
    const oldHead = this.#head.value;
    this.#head = this.#head.nextNode || null;
    this.#length--;
    return oldHead;
  }

  contains(value) {
    if (this.#head.value === value) return true;
    else if (this.#tail.value === value) return true;
    else {
      let currentNode = this.#head;
      for (let i = 1; i < this.#length; i++) {
        currentNode = currentNode.nextNode;
        if (currentNode.value === value) return true;
      }
      return false;
    }
  }

  findIndex(value) {
    if (this.#head.value === value) return 0;
    else if (this.#tail.value === value) return this.#length - 1;
    else {
      let currentNode = this.#head;
      for (let i = 0; i < this.#length; i++) {
        if (currentNode.value === value) return i;
        else currentNode = currentNode.nextNode;
      }
      return -1;
    }
  }

  toString() {
    if (!this.#head) return "{ empty list }";
    let currentNode = this.#head;
    let str = "{ ";
    while (currentNode) {
      str = str + `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    return str + "null }";
  }

  insertAt(index, ...values) {
    if (index < 0 || index >= this.#length)
      throw new RangeError(
        `LinkedList.insertAt(): Given index out of range [Given: ${index}] [Expected Range: 0 - ${this.#length - 1}]`,
      );
    else {
      if (index === 0) {
        let joinStart;
        const joinEnd = this.#head;

        for (let i = 0; i < values.length; i++) {
          const newNode = new Node(values[i]);
          if (i === 0) this.#head = newNode;
          if (joinStart) joinStart.nextNode = newNode;
          joinStart = newNode;
        }

        joinStart.nextNode = joinEnd;
      } else {
        let joinStart = this.#head;
        for (let i = 0; i < this.#length; i++) {
          if (i === index - 1) break;
          else joinStart = joinStart.nextNode;
        }
        const joinEnd = joinStart.nextNode;

        for (const val of values) {
          const newNode = new Node(val);
          joinStart.nextNode = newNode;
          joinStart = newNode;
        }

        joinStart.nextNode = joinEnd;
        if (joinEnd === null) this.#tail = joinStart;
      }

      this.#length = this.#length + values.length;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.#length)
      throw new RangeError(
        `LinkedList.removeAt(): Given index out of range [Given: ${index}] [Expected Range: 0 - ${this.#length - 1}]`,
      );
    else {
      let currentNode = this.#head;
      let prevNode = null;
      for (let i = 0; i < this.#length; i++) {
        if (i === index) break;
        else {
          prevNode = currentNode;
          currentNode = currentNode.nextNode;
        }
      }

      if (prevNode) prevNode.nextNode = currentNode.nextNode;
      else this.#head = currentNode.nextNode;

      if (this.#tail === currentNode) this.#tail = prevNode ? prevNode : null;

      currentNode.clear();
      this.#length--;
    }
  }
}

export { LinkedList };
