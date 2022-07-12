
/* 
---~~~=*%$}>    addBalance    <{$%&=~~~---

Inputs:  

*/

import { getContract } from '../utils/utils'
import { ethers } from 'ethers';


export default async function addBalance() {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    await contract.addBalance({ value: ethers.utils.parseEther("0.00")});
    
  }
  catch (error) {
    console.log(error);
    return "addBalance failed";
  }
}