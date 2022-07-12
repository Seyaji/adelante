
/* 
---~~~=*%$}>    returnSum    <{$%&=~~~---

Inputs:  _a: uint256, _b: uint256

*/

import { getContract } from '../utils/utils'



export default async function returnSum(_a: string, _b: string) {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    const data = await contract.returnSum(_a, _b);
    return data;
  }
  catch (error) {
    console.log(error);
    return "returnSum failed";
  }
}