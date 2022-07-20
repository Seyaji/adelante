import { ABI } from '../types.js';
import functionTestTemplate from "../templates/tests/functionTestTemplate.js";
import componentTestTemplate from '../templates/tests/componentTestTemplate.js';

import fs from 'fs'

export default function generateTests(functions: ABI[], projectPath: string, testOutput: string, useTs: boolean, inlineFunctions: boolean, inlineComponents: boolean) {

  (function generate() {

    fs.mkdir(`./${testOutput}/tests/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = functionTestTemplate(name, inputs, outputs, stateMutability, inlineFunctions, projectPath).file;
        fs.writeFile(
          `./${testOutput}/tests/functions/${name}.test${useTs ? ".ts" : ".js"}`,
          test,
          (error) => {
            if (error) throw error;
          }
        );
      })
    })

    fs.mkdir(`./${testOutput}/tests/components`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = componentTestTemplate(name, inputs, outputs, stateMutability, inlineComponents, projectPath).file;
        fs.writeFile(
          `./${testOutput}/tests/components/${name}.test${useTs ? ".tsx" : ".jsx"}`,
          test,
          (error) => {
            if (error) throw error;
          }
        )
      })
    })
  })()
}