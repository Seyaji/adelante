
/* 
---~~~=*%$}>    withdrawBalance    <{$%&=~~~---

Inputs:  amount: uint256

*/

import { getContract } from '../utils/utils'
import { ethers } from 'ethers';


export default async function withdrawBalance(amount: string) {
  try {
    const { ethereum } = window;
    const contract = getContract(ethereum);
    await contract.withdrawBalance(amount, { value: ethers.utils.parseEther("0.00")});
    
  }
  catch (error) {
    console.log(error);
    return "withdrawBalance failed";
  }
}