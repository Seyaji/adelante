import { ABI } from "../types";
import { capitalize } from "../utils.js";
import Metamask from "./metamask.js";
import Nav from "./nav.js";

export function componentReact(name: string) {
  return `      <${capitalize(name)} />`;
}

export function componentImport(name: string, depth: string) {
  return `import ${capitalize(name)} from '${depth}/components/${name}';`;
}

export function functionImport(name: string, depth: any, inline: boolean) {
  return `import ${inline ? "{ " + name + " }" : name} from '${depth}/functions/${inline ? "functions.js" : name}';`;
}

export function metamaskImport(useTs: boolean) {
  return `import ${Metamask(useTs).name} from './${Metamask(useTs).name}';`;
}

export function navImport(useTs: boolean) {
  return `import ${Nav(useTs).name} from './${Nav(useTs).name}';`;
}

export function inlineFuncRequire(useTs: boolean) {
  return `
import { getContract } from '../utils/utils';
${useTs ? "import { ethers } from 'ethers';" : ""}
`;
}
export function inlineFunctionImport(useTs: boolean) {
  return `
import { getContract } from '../utils/utils';
${useTs ? "import { ethers } from 'ethers';" : ""}
`;
}

export function inlineComponentImport(functions: ABI[], inline: boolean, useTs: boolean) {
  return `
import React, { useState } from 'react';
${
  inline
    ? `
import {
${functions.map(({ name }) => `${name},`).join("\n")}
} from '../functions/functions.js';
${
  useTs
    ? `
type State = {
  [key: string]: string
}
`
    : ""
}
`
    : functions.map(({ name }) => componentImport(name, ".")).join("\n")
}
`;
}
