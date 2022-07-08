// Util Functions

export const getContract = (contractName: string, contractAddress: string) => 
`
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";
import ${contractName} from './${contractName}.json';

export const contractAddress = '${contractAddress}';

export const getContract = (ethereum: MetaMaskInpageProvider) => {
  const provider = new ethers.providers.Web3Provider(ethereum as any);
  const signer = provider.getSigner();
  const connectedContract: ethers.Contract = new ethers.Contract(contractAddress, UnitTrust.abi, signer);
  return connectedContract;
}
`