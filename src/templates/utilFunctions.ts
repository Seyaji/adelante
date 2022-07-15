// Util Functions

export const getContract = (contractName: string, contractAddress: string, useTs: boolean) => 
`
import { ethers } from 'ethers';${
useTs ? `
import { MetaMaskInpageProvider } from "@metamask/providers";` : ""
}
import ${contractName} from '../${contractName}.json';

export const contractAddress = '${contractAddress}';

export const getContract = (ethereum${ useTs ? ": MetaMaskInpageProvider" : ""}) => {
  const provider = new ethers.providers.Web3Provider(ethereum${ useTs ? " as any" : ""});
  const signer = provider.getSigner();
  const connectedContract${useTs ? ": ethers.Contract" : ""} = new ethers.Contract(contractAddress, ${contractName}.abi, signer);
  return connectedContract;
}
`