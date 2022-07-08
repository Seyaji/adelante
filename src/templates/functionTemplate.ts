import { DataTypes, Input } from '../types.js'
import dataTypes from './dataTypes.js'

// ${dataTypes[type]}

const returnData = (res: []) => {
  if(res.length === 0) return '';
  return `return data;`
}

const stateMut = (stateMutability: string) => stateMutability === 'payable' ? `, { value: ethers.utils.parseEther("0.00")}` : ''

export default function functionTemplate(name: string, inputs: Input[], outputs: [], stateMutability: string){
  return (
`
// ${name} ${inputs.map(({ name, type }) => `${name}: ${dataTypes[type]}`).join(", ")}
import { getContract } from '../utils/utils';
${stateMutability === 'payable' ? `import { ethers } from 'ethers';` : ''}

export default async function ${name}(${inputs.map(({ name, type }) => `${name}: string`).join(", ")}) {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    ${returnData(outputs) ? 'const data = await' : 'await'} contract.${name}(${inputs.map(({ name }) => name).join(", ")}${stateMut(stateMutability)});
    ${returnData(outputs)}
  }
  catch (error) {
    console.log(error);
  }
}`)
}