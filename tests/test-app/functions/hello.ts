
/* 
---~~~=*%$}>    hello    <{$%&=~~~---

Inputs:  

*/

import { getContract } from '../utils/utils'



export default async function hello() {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    const data = await contract.hello();
    return data;
  }
  catch (error) {
    console.log(error);
    return "hello failed";
  }
}