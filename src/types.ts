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

export type DataTypes = {
  [key: string]: string;
};
