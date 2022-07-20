import { ABI } from '../types.js';
import functionTestTemplate from "../templates/tests/functionTestTemplate.js";
import componentTestTemplate from '../templates/tests/componentTestTemplate.js';

import fs from 'fs'

export default function generateTests(functions: ABI[], projectPath: string,) {

  (function generate() {

    fs.mkdir(`./tests/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = functionTestTemplate(name, inputs, outputs, stateMutability, projectPath).file;
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
        const test = componentTestTemplate(name, inputs, outputs, stateMutability, projectPath).file;
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