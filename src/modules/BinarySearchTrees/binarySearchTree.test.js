import { BST } from "./binarySearchTree.js";

describe("Test BST", () => {
  const bst = new BST();

  test("reset([2, 4, 5, 23, 99, 99]) + includes(...)", () => {
    bst.reset([2, 4, 5, 23, 99, 99]);
    expect(bst.includes(5)).toBe(true);
    expect(bst.includes(2)).toBe(true);
    expect(bst.includes(99)).toBe(true);
    expect(bst.includes(23)).toBe(true);
    expect(bst.includes(1)).toBe(false);
  });

  test("reset(['apple', 'red', 'banana', 'yellow', 'vest', 'orange']) + includes(...)", () => {
    bst.reset(["apple", "red", "banana", "yellow", "vest", "orange"]);
    expect(bst.includes("apple")).toBe(true);
    expect(bst.includes("red")).toBe(true);
    expect(bst.includes("banana")).toBe(true);
    expect(bst.includes("yellow")).toBe(true);
    expect(bst.includes("vest")).toBe(true);
    expect(bst.includes("orange")).toBe(true);
    expect(bst.includes(87)).toBe(false);
    expect(bst.includes("lane")).toBe(false);
  });

  test("insert('robey') + insert('robey')", () => {
    bst.insert("robey");
    expect(bst.includes("robey")).toBe(true);
  });

  test("delete('robey') + delete('grape')", () => {
    expect(bst.includes("robey")).toBe(true);
    bst.delete("robey");
    expect(bst.includes("robey")).toBe(false);

    expect(bst.includes("grape")).toBe(false);
    bst.delete("grape");
    expect(bst.includes("grape")).toBe(false);
  });

  test("balance checking & rebalancing", () => {
    const randsSm = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 100 + 1),
    );
    bst.reset(randsSm);

    expect(bst.isBalanced()).toBe(true);

    const randsLg = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100 + 100),
    );
    randsLg.forEach((v) => bst.insert(v));

    expect(bst.isBalanced()).toBe(false);

    bst.rebalance();

    expect(bst.isBalanced()).toBe(true);
  });
});
