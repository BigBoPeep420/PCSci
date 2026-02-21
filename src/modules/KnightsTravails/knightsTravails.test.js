import { knightsTravails } from "./knightsTravails.js";

describe("Test knightsTravails()", () => {
  test("knightsTravails([0, 0], [1, 2]", () => {
    const res = knightsTravails([0, 0], [1, 2]);
    expect(res).toStrictEqual([
      [0, 0],
      [1, 2],
    ]);
  });

  test("knightsTravails([0, 0], [7, 7])", () => {
    const res = knightsTravails([0, 0], [7, 7]);
    console.log("[0,0] > [7,7]", res);
    expect(res.length).toBeLessThan(8);
  });

  test("knightsTravails([2, 3], [6, 6])", () => {
    const res = knightsTravails([2, 3], [6, 6]);
    console.log("[2,3] > [6,6]", res);
    expect(res.length).toBeLessThan(5);
  });
});
