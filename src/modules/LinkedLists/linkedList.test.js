import { LinkedList } from "./linkedList.js";

describe("test LinkedList class", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  test("test initialize empty list", () => {
    expect(list.head()).toBeUndefined();
    expect(list.tail()).toBeUndefined();
    expect(list.size()).toBe(0);
  });

  test("test append(12)", () => {
    list.append(12);

    expect(list.head()).toBe(12);
    expect(list.tail()).toBe(12);
    expect(list.size()).toBe(1);
  });
  test("test append(12) + append(69)", () => {
    list.append(12);
    list.append(69);

    expect(list.head()).toBe(12);
    expect(list.tail()).toBe(69);
    expect(list.size()).toBe(2);
  });

  test("test prepend(69) + prepend(88)", () => {
    list.prepend(69);
    list.prepend(88);

    expect(list.head()).toBe(88);
    expect(list.tail()).toBe(69);
    expect(list.size()).toBe(2);
  });

  test("test at(3) + at(10) on { 3 > 6 > 69 > 420 > 42069 }", () => {
    list.append(3);
    list.append(6);
    list.append(69);
    list.append(420);
    list.append(42069);

    expect(list.at(3)).toBe(420);
    expect(list.at(10)).toBe(undefined);
  });

  test("test pop() + pop() on { 3 > 6 > 69 > 420 > 42069 }", () => {
    list.append(3);
    list.append(6);
    list.append(69);
    list.append(420);
    list.append(42069);

    expect(list.pop()).toBe(3);
    expect(list.size()).toBe(4);
    expect(list.pop()).toBe(6);
    expect(list.size()).toBe(3);
  });

  test("test contains(69) + contains(1988) on { 3 > 6 > 69 > 420 > 42069 }", () => {
    list.append(3);
    list.append(6);
    list.append(69);
    list.append(420);
    list.append(42069);

    expect(list.contains(69)).toBe(true);
    expect(list.contains(1988)).toBe(false);
  });

  test("test findIndex(69) + findIndex(1988) on { 3 > 6 > 69 > 420 > 42069 }", () => {
    list.append(3);
    list.append(6);
    list.append(69);
    list.append(420);
    list.append(42069);

    expect(list.findIndex(69)).toBe(2);
    expect(list.findIndex(1988)).toBe(-1);
  });

  test("test insertAt(2, 23, 88, 99) on { 3 > 6 > 69 > 420 > 42069 }", () => {
    list.append(3);
    list.append(6);
    list.append(69);
    list.append(420);
    list.append(42069);

    list.insertAt(2, 23, 88, 99);

    expect(list.at(2)).toBe(23);
    expect(list.at(5)).toBe(69);
  });

  test("test removeAt(1) + removeAt(0) on { 3 > 6 > 69 > 420 > 42069 }", () => {
    list.append(3);
    list.append(6);
    list.append(69);
    list.append(420);
    list.append(42069);

    list.removeAt(1);

    expect(list.at(0)).toBe(3);
    expect(list.at(1)).toBe(69);
    expect(list.at(2)).toBe(420);

    list.removeAt(0);

    expect(list.at(0)).toBe(69);
    expect(list.at(1)).toBe(420);
  });
});
