import "@/styles/main.css";
import { emmet } from "emmet-elem";
import { listOutput } from "./modules/LinkedLists/main.js";
import { BST } from "./modules/BinarySearchTrees/binarySearchTree.js";

const linkedList = emmet(`p{LinkedList main.js Output: }`);
const linkedListOutput = emmet("span");
linkedListOutput.textContent = listOutput;
linkedList.appendChild(linkedListOutput);

document.body.append(linkedList);

document.body.appendChild(bstSection());

function bstSection() {
  const outer = emmet(`section.bstSection`);

  let step = emmet(`div.step{New BST from Array of 20 Random Integers < 100}`);
  let op = emmet(`p.op`);
  op.textContent = `const bst = new BST(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)))}`;
  const bst = new BST(
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)),
  );
  outer.append(step, op, printTree(bst));

  step = emmet(`div.step{Confirm tree is balanced}`);
  op = emmet(`p.op`);
  op.textContent = `bst.isBalanced()`;
  let output = emmet(`div.bstOutput{${bst.isBalanced()}}`);
  outer.append(step, op, output, printTree(bst));

  step = emmet(`div.step{Print elements in level, pre, post and in order}`);
  op = emmet("p.op");
  op.textContent = `bst.forEachLevelOrder((v) => newArr.push(v))`;
  let newArr = [];
  bst.forEachLevelOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(step, op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachPreOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachPreOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachPostOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachPostOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachInOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachInOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output, printTree(bst));

  step = emmet(`div.step{Unbalance tree by adding 15 integers > 100}`);
  op = emmet(`p.op`);
  op.textContent = `newArr.forEach((v) => bst.insert(v))`;
  newArr = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 100 + 100),
  );
  newArr.forEach((v) => bst.insert(v));
  output = emmet(`div.bstOutput{${bst.isBalanced()}}`);
  outer.append(step, op);
  op = emmet("p.op");
  op.textContent = `bst.isBalanced()`;
  output = emmet(`div.bstOutput{${bst.isBalanced()}}`);
  outer.append(op, output, printTree(bst));

  step = emmet(`div.step{Rebalance tree}`);
  op = emmet(`p.op`);
  op.textContent = `bst.rebalance()`;
  outer.append(step, op);
  bst.rebalance();
  op = emmet("p.op");
  op.textContent = `bst.isBalanced()`;
  output = emmet(`div.bstOutput{${bst.isBalanced()}}`);
  outer.append(op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachLevelOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachLevelOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachPreOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachPreOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachPostOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachPostOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output);

  op = emmet("p.op");
  op.textContent = `bst.forEachInOrder((v) => newArr.push(v))`;
  newArr = [];
  bst.forEachInOrder((v) => newArr.push(v));
  output = emmet(`div.bstOutput{[${newArr}]}`);
  outer.append(op, output, printTree(bst));

  return outer;
}
function printTree(bst) {
  const outer = emmet(`div.bstOutput`);
  outer.append(...bst.treeToString().map((line) => emmet(`p{${line}}`)));
  return outer;
}
