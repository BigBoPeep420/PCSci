import { emmet } from "emmet-elem";
import { listOutput } from "./modules/LinkedLists/main.js";
import { BST } from "./modules/BinarySearchTrees/binarySearchTree.js";

const linkedList = emmet(`p{LinkedList main.js Output: }`);
const linkedListOutput = emmet("span");
linkedListOutput.textContent = listOutput;
linkedList.appendChild(linkedListOutput);

document.body.append(linkedList);

const bst = new BST(["apple", "red", "banana", "yellow", "vest", "orange"]);
bst.insert("lane");
bst.insert("hi");
bst.insert("hello");
bst.insert("hello");
bst.insert("right");
bst.insert("robey");
bst.insert("door");
bst.insert("drive");
bst.insert("dam");
bst.insert("dumb");
bst.insert("durty");

bst.delete("hello");
bst.logTree();

// const bst = new BST([2, 4, 5, 23, 99, 99]);
// bst.logTree();
// bst.insert(1);
// bst.insert(10);
// bst.insert(8);
// bst.insert(85);
// bst.insert(20);
// bst.logTree();
