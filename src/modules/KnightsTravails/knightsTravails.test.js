import { knightsTravails } from "./knightsTravails.js";

describe("Test knightsTravails()", () => {
  // test("knightsTravails([0, 0], [1, 2]", () => {
  //   const res = knightsTravails([0, 0], [1, 2]);
  //   expect(res).toStrictEqual([
  //     [0, 0],
  //     [1, 2],
  //   ]);
  // });

  test("knightsTravails([0, 0], [7, 7]", () => {
    const res = knightsTravails([0, 0], [7, 7]);
    console.log(res);
    expect(res.length).toBeLessThan(8);
  });
});
