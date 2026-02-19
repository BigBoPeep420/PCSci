import { LinkedList } from "./linkedList.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

const listOutput = list.toString();
console.log(listOutput);

export { listOutput };
