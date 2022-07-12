import dataTypes from "./dataTypes.js";
import { Input } from "../types";

// ${dataTypes[type]}

const returnData = (res: []) => {
  if (res.length === 0) return "";
  return `return data;`;
};


const stateMut = (stateMutability: string) =>
  stateMutability === "payable" ? `, { value: ethers.utils.parseEther("0.00")}` : "";

export default function functionTemplate(
  name: string,
  inputs: Input[],
  outputs: [],
  stateMutability: string,
  inline: boolean,
  useTs: boolean,
): string {

  const inputMap = (ts: boolean) => inputs.map(({ name, type }) => `${name}${ts ? ": string" : ""}`).join(", ")

  return `
/* 
---~~~=*%$}>    ${name}    <{$%&=~~~---

Inputs:  ${inputs.map(({ name, type }) => `${name}: ${type}`).join(", ")}

*/
${
inline ? "" :
`
import { getContract } from '../utils/utils'
${stateMutability === "payable" ? `import { ethers } from 'ethers';` : ""}
`
}

${inline ? "export" : "export default"} async function ${name}(${inputMap(useTs)}) {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    ${returnData(outputs) ? "const data = await" : "await"} contract.${name}(${inputs
    .map(({ name }) => name)
    .join(", ")}${stateMut(stateMutability)});
    ${returnData(outputs)}
  }
  catch (error) {
    console.log(error);
    return "${name} failed";
  }
}`;
}
