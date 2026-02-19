import { HashMap } from "./hashMap.js";

describe("Test HashMap Class", () => {
  const hashMap = new HashMap();

  test("Test set(apple, red) + set(banana, yellow)", () => {
    hashMap.set("apple", "red");
    hashMap.set("banana", "yellow");

    const entries = hashMap.entries();

    expect(entries).toContainEqual(["apple", "red"]);
    expect(entries).toContainEqual(["banana", "yellow"]);
  });

  test("Test get(apple) + get(grape)", () => {
    expect(hashMap.get("apple")).toBe("red");
    expect(hashMap.get("grape")).toBe(null);
  });

  test("Test has(apple) + has(grape)", () => {
    expect(hashMap.has("apple")).toBe(true);
    expect(hashMap.has("grape")).toBe(false);
  });

  test("Test remove(apple) + remove(grape)", () => {
    expect(hashMap.remove("apple")).toBe(true);
    expect(hashMap.has("apple")).toBe(false);
    expect(hashMap.remove("grape")).toBe(false);
  });

  test("Test length() + set(apple) + length()", () => {
    expect(hashMap.length()).toBe(1);

    hashMap.set("apple", "red");

    expect(hashMap.length()).toBe(2);
  });

  test("Test keys()", () => {
    const keys = hashMap.keys();

    expect(keys).toContain("apple");
    expect(keys).toContain("banana");
  });

  test("Test values()", () => {
    const values = hashMap.values();

    expect(values).toContain("red");
    expect(values).toContain("yellow");
  });

  test("Test growth", () => {
    expect(hashMap.capacity).toBe(16);

    hashMap.set("carrot", "orange");
    hashMap.set("dog", "brown");
    hashMap.set("elephant", "gray");
    hashMap.set("frog", "green");
    hashMap.set("grape", "purple");
    hashMap.set("hat", "black");
    hashMap.set("ice cream", "white");
    hashMap.set("jacket", "blue");
    hashMap.set("kite", "pink");
    hashMap.set("lion", "golden");
    hashMap.set("spoon", "silver");
    hashMap.set("speaker", "teal");

    expect(hashMap.capacity).toBe(32);

    hashMap.set("bottle", "orange");
    hashMap.set("monitor", "brown");
    hashMap.set("keyboard", "gray");
    hashMap.set("mouse", "green");
    hashMap.set("phone", "purple");
    hashMap.set("computer", "black");
    hashMap.set("remote", "white");
    hashMap.set("controller", "blue");
    hashMap.set("can", "pink");
    hashMap.set("snack", "golden");
    hashMap.set("candy", "silver");
    hashMap.set("receipt", "teal");

    expect(hashMap.capacity).toBe(64);
  });

  test("Test shrink", () => {
    hashMap.remove("bottle");
    hashMap.remove("monitor");
    hashMap.remove("keyboard");
    hashMap.remove("mouse");
    hashMap.remove("phone");
    hashMap.remove("computer");
    hashMap.remove("remote");
    hashMap.remove("controller");
    hashMap.remove("can");
    hashMap.remove("snack");
    hashMap.remove("candy");
    hashMap.remove("receipt");

    expect(hashMap.capacity).toBe(32);
  });

  test("Test clear()", () => {
    expect(hashMap.has("apple")).toBe(true);

    hashMap.clear();

    expect(hashMap.length()).toBe(0);
    expect(hashMap.has("apple")).toBe(false);
    expect(hashMap.capacity).toBe(16);
  });
});
