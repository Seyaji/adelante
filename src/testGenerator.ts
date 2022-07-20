import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { ABI } from './types.js';
import functionTestTemplate from "./tests/functionTestTemplate.js";
import componentTestTemplate from './tests/componentTestTemplate.js';

import fs from 'fs'

export function generateTests(abi: ABI[]) {
  
  const functions: ABI[] = abi.filter(({ type}) => type === 'function');

  (function generate() {

    fs.mkdir(`./tests/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = functionTestTemplate(name, inputs, outputs, stateMutability).file;
        fs.writeFile(
          `./tests/functions/${name}.test.ts`,
          test,
          (error) => {
            if (error) throw error;
          }
        );
      })
    })

    fs.mkdir(`./tests/components`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = componentTestTemplate(name, inputs, outputs, stateMutability).file;
        fs.writeFile(
          `./tests/components/${name}.test.tsx`,
          test,
          (error) => {
            if (error) throw error;
          }
        )
      })
    })
  })()
}