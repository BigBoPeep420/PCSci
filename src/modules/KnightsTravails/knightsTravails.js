class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  #head;
  #tail;

  constructor(...values) {
    this.#head = null;
    this.#tail = null;

    values.forEach((value, index) => {
      const newNode = new Node(value);
      if (index === 0) {
        this.#head = newNode;
        this.#tail = newNode;
      } else {
        this.#tail.next = newNode;
        this.#tail = newNode;
      }
    });
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    }
    this.#tail.next = newNode;
    this.#tail = newNode;
  }

  dequeue() {
    if (!this.#head) return null;
    const val = this.#head.value;
    this.#head = this.#head.next;
    return val;
  }

  empty() {
    if (!this.#head) return true;
    else return false;
  }

  head() {
    return this.#head;
  }
}

function knightsTravails(start, end) {
  const queue = new Queue([start]);
  const visited = new Set();
  visited.add(start.toString());

  while (!queue.empty()) {
    const currentPath = queue.dequeue();
    const lastSquare = currentPath[currentPath.length - 1];
    if (lastSquare[0] === end[0] && lastSquare[1] === end[1])
      return currentPath;
    const possibleMoves = findMoves(lastSquare);
    for (const move of possibleMoves) {
      if (!visited.has(move.toString())) {
        visited.add(move.toString());
        queue.enqueue([...currentPath, move]);
      }
    }
  }

  function findMoves(square) {
    const moves = [
      [square[0] + 1, square[1] + 2],
      [square[0] + 1, square[1] - 2],
      [square[0] + 2, square[1] + 1],
      [square[0] + 2, square[1] - 1],
      [square[0] - 1, square[1] + 2],
      [square[0] - 1, square[1] - 2],
      [square[0] - 2, square[1] + 1],
      [square[0] - 2, square[1] - 1],
    ];
    return moves.filter((move) => {
      return move[0] < 8 && move[1] < 8 && move[0] >= 0 && move[1] >= 0;
    });
  }
}

export { knightsTravails };
