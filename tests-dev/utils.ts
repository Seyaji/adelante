import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { ABI } from '../src/types.js';
import functionTestTemplate from './functionTestTemplate.js';
import componentTestTemplate from './componentTestTemplate.js';

import fs from 'fs'

const TestAbi = require('./Test.json')

export function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


export function generateTests() {
  const { abi } = TestAbi;
  // @ts-ignore
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