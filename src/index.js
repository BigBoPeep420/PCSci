import { emmet } from "emmet-elem";
import { listOutput } from "./modules/LinkedLists/main.js";

const linkedList = emmet(`p{LinkedList main.js Output: }`);
const linkedListOutput = emmet("span");
linkedListOutput.textContent = listOutput;
linkedList.appendChild(linkedListOutput);

document.body.append(linkedList);
