import appRoot from "app-root-path";

export function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

import { createRequire } from "module";
export const require = createRequire(import.meta.url);

export const useTs = (typescript: boolean, ts: string, js: string) => typescript ? ts : js;

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