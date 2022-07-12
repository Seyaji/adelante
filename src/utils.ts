import appRoot from "app-root-path";

export function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

import { createRequire } from "module";
export const require = createRequire(import.meta.url);

export const useTs = (typescript: boolean, ts: string, js: string) => typescript ? ts : js;

export const propsFilter = (props: any, outputs: any) => (props.filter((prop: any) => {
  if (prop.handle === "change" && outputs.length > 0) {
    return prop
  }
  if (prop.handle === "none") {
    return prop
  }
}))

export function importer() {
  try {
    const adelante = require(`${appRoot}/adelante.json`);
    console.log(adelante)
    return adelante;
  } catch (error) {
    console.log('trying to import from: ', appRoot + '/adelante.json');
    console.log(error)
  }
}

export const funcFormat = (name: string) => {
  return name.split("").reduce((acc, curr) => {
    if (curr === curr.toUpperCase()) {
      acc += " ";
    }
    acc += curr;
    return acc;
  })
}