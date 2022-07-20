
/* 
---~~~=*%$}>    getNumber    <{$%&=~~~---

Inputs:  

*/

import { getContract } from '../utils/utils'



export default async function getNumber() {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    const data = await contract.getNumber();
    return data;
  }
  catch (error) {
    console.log(error);
    return "getNumber failed";
  }
}