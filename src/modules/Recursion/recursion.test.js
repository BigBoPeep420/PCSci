import { fibs, mergeSort } from "./recursion.js";

describe("test fibs function", () => {
  test("test fibs(5)", () => {
    expect(fibs(5)).toStrictEqual([0, 1, 1, 2, 3]);
  });
  test("test fibs(9)", () => {
    expect(fibs(9)).toStrictEqual([0, 1, 1, 2, 3, 5, 8, 13, 21]);
  });
  test("test fibs(0)", () => {
    expect(fibs(0)).toStrictEqual([0]);
  });
  test("test fibs(1)", () => {
    expect(fibs(1)).toStrictEqual([0]);
  });
  test("test fibs(15)", () => {
    expect(fibs(15)).toStrictEqual([
      0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377,
    ]);
  });
});

describe("test mergeSort function", () => {
  test("test mergeSort([9, 4])", () => {
    expect(mergeSort([9, 4])).toStrictEqual([4, 9]);
  });
  test("test mergeSort([3, 8, 10, 6, 50, 23, 88, 44])", () => {
    expect(mergeSort([3, 8, 10, 6, 50, 23, 88, 44])).toStrictEqual([
      3, 6, 8, 10, 23, 44, 50, 88,
    ]);
  });
  test("test mergeSort([49, 8, 18, 86, 520, 123, 88, 44, 22, 789, 431, 420, 69])", () => {
    expect(
      mergeSort([49, 8, 18, 86, 520, 123, 88, 44, 22, 789, 431, 420, 69]),
    ).toStrictEqual([8, 18, 22, 44, 49, 69, 86, 88, 123, 420, 431, 520, 789]);
  });
  test("test mergeSort([8])", () => {
    expect(mergeSort([8])).toStrictEqual([8]);
  });
});
