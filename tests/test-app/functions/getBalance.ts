
/* 
---~~~=*%$}>    getBalance    <{$%&=~~~---

Inputs:  

*/

import { getContract } from '../utils/utils'



export default async function getBalance() {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    const data = await contract.getBalance();
    return data;
  }
  catch (error) {
    console.log(error);
    return "getBalance failed";
  }
}