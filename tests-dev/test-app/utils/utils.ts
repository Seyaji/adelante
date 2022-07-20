
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";
import Test from '../Test.json';

export const contractAddress = 'test-address';

export const getContract = (ethereum: MetaMaskInpageProvider) => {
  const provider = new ethers.providers.Web3Provider(ethereum as any);
  const signer = provider.getSigner();
  const connectedContract: ethers.Contract = new ethers.Contract(contractAddress, UnitTrust.abi, signer);
  return connectedContract;
}
