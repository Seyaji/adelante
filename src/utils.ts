
export function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


export const useTs = (typescript: boolean, ts: string, js: string) => typescript ? ts : js;

export const propsFilter = (props: any, outputs: any) => (props.filter((prop: any) => {
  if (prop.handle === "change" && outputs.length > 0) {
    return prop
  }
  if (prop.handle === "none") {
    return prop
  }
}))


export const funcFormat = (name: string) => {
  return name.split("").reduce((acc, curr) => {
    if (curr === curr.toUpperCase()) {
      acc += " ";
    }
    acc += curr;
    return acc;
  })
}

import { DataTypes } from './types';
export const dataTypes: DataTypes = {
    address: 'string',
    bool: 'boolean',
    uint: 'number',
    uint8: 'number',
    uint16: 'number',
    uint32: 'number',
    uint64: 'number',
    uint128: 'number',
    uint256: 'number',
}