import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
export interface Input {
  internalType: string;
  name: string;
  type: string;
}

export interface ABI {
  inputs: Input[];
  name: string;
  outputs: [];
  stateMutability: string;
  type: string;
}

export interface Adelante {
  useTypescript?: boolean;
  inlineFunctions: boolean;
  inlineComponents: boolean;
  abiPath?: string;
  contractAddress?: string;
}

export type DataTypes = {
  [key: string]: string;
};

