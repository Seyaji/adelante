
/* 
---~~~=*%$}>    storeNumber    <{$%&=~~~---

Inputs:  _number: uint256

*/

import { getContract } from '../utils/utils'



export default async function storeNumber(_number: string) {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    await contract.storeNumber(_number);
    
  }
  catch (error) {
    console.log(error);
    return "storeNumber failed";
  }
}