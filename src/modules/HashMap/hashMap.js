class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }

  clear() {
    this.value = null;
    this.nextNode = null;
  }
}

class HashMap {
  #loadFactor;
  #unloadFactor;
  #capacity;
  #buckets = [];
  #length = 0;

  constructor(loadFactor = 0.75, capacity = 16, unloadFactor = 0.25) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#unloadFactor = unloadFactor;
    this.#buckets = Array.from({ length: this.#capacity }, () => null);
  }

  #hash(key, capacity = this.#capacity) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = (31 * hashCode + key.charCodeAt(i)) % capacity;
    }
    if (hashCode < 0 || hashCode > this.#buckets.length)
      throw new RangeError(
        `Generated Hash out of range [Hash: ${hashCode}] [Range: 0 - ${this.#buckets.length - 1}]`,
      );
    return hashCode;
  }

  #rehash() {
    const oldBucks = this.#buckets;

    const factor = this.#length / this.#capacity;
    this.#capacity =
      factor >= this.#loadFactor
        ? this.#capacity * 2
        : Math.max(16, this.#capacity / 2);
    this.#buckets = Array.from({ length: this.#capacity }, () => null);
    for (let i = 0; i < oldBucks.length; i++) {
      let currentNode = oldBucks[i];
      while (currentNode) {
        const nextTemp = currentNode.nextNode;
        this.#insertNode(currentNode);
        currentNode = nextTemp;
      }
    }
  }

  #insertNode(node) {
    const hash = this.#hash(node.value[0]);
    node.nextNode = this.#buckets[hash];
    this.#buckets[hash] = node;
  }

  #changeLength(amount) {
    this.#length += amount;
    const factor = this.#length / this.#capacity;
    if (
      (factor <= this.#unloadFactor && this.#capacity > 16) ||
      factor >= this.#loadFactor
    )
      this.#rehash();
  }

  set(key, value) {
    const hash = this.#hash(key);

    let currentNode = this.#buckets[hash];

    while (currentNode) {
      if (!currentNode.nextNode) break;
      currentNode = currentNode.nextNode;
    }
    if (!currentNode) this.#buckets[hash] = new Node([key, value]);
    else currentNode.nextNode = new Node([key, value]);
    this.#changeLength(1);
  }

  get(key) {
    const hash = this.#hash(key);

    let found = null;
    let currentNode = this.#buckets[hash];
    while (currentNode) {
      if (currentNode.value && currentNode.value[0] === key) {
        found = currentNode.value[1];
        break;
      } else currentNode = currentNode.nextNode;
    }
    return found;
  }

  has(key) {
    const hash = this.#hash(key);

    let found = false;
    let currentNode = this.#buckets[hash];
    while (currentNode) {
      if (currentNode.value && currentNode.value[0] === key) {
        found = true;
        currentNode = null;
        break;
      } else currentNode = currentNode.nextNode;
    }

    return found;
  }

  remove(key) {
    const hash = this.#hash(key);

    let currentNode = this.#buckets[hash];
    let prevNode = null;
    while (currentNode) {
      if (currentNode.value[0] === key) {
        if (prevNode) prevNode.nextNode = currentNode.nextNode;
        else this.#buckets[hash] = currentNode.nextNode;

        this.#changeLength(-1);
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#capacity = 16;
    this.#buckets = Array.from({ length: this.#capacity }, () => null);
    this.#length = 0;
  }

  keys() {
    const keys = [];
    this.#buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        if (currentNode.value) keys.push(currentNode.value[0]);
        currentNode = currentNode.nextNode;
      }
    });
    return keys;
  }

  values() {
    const values = [];
    this.#buckets.forEach((bucket) => {
      let currentNode = bucket;
      while (currentNode) {
        if (currentNode.value) values.push(currentNode.value[1]);
        currentNode = currentNode.nextNode;
      }
    });
    return values;
  }

  entries() {
    const output = [];

    this.#buckets.forEach((bucket) => {
      if (bucket) {
        let currentNode = bucket;
        while (currentNode) {
          output.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    });

    return output;
  }

  get capacity() {
    return this.#capacity;
  }
}

export { HashMap };
