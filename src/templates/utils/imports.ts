import { ABI } from "../../types";
import { capitalize } from "../../utils.js";

export function componentReact(name: string, props: any[]) {
  return `      <${capitalize(name)} ${ props.length > 0 ? props.map((prop) => `${prop.name}={${prop.name}}`).join(" ") : ""} />`;
}

export function componentImport(name: string, path: string, inline: boolean) {
  return `import ${ inline ? `"{" ${ capitalize(name) } "}"` : capitalize(name)} from '${path}${name}';`;
}

export function functionImport(name: string, depth: any, inline: boolean) {
  return `import ${inline ? "{ " + name + " }" : name} from '${depth}functions/${inline ? "functions.js" : name}';`;
}


export function inlineFunctionImport() {
  return `
import { getContract } from '../utils/utils';
import { ethers } from 'ethers';
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
    : functions.map(({ name }) => componentImport(name, ".", false)).join("\n")
}
`;
}
