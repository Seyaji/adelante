import { ABI } from '../types.js';
import functionTestTemplate from "../templates/tests/functionTestTemplate.js";
import componentTestTemplate from '../templates/tests/componentTestTemplate.js';

import fs from 'fs'

export default function generateTests(functions: ABI[], projectPath: string, useTs: boolean) {

  (function generate() {

    fs.mkdir(`./${projectPath}/tests/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = functionTestTemplate(name, inputs, outputs, stateMutability, projectPath).file;
        fs.writeFile(
          `./${projectPath}/tests/functions/${name}.test${useTs ? ".ts" : ".js"}`,
          test,
          (error) => {
            if (error) throw error;
          }
        );
      })
    })

    fs.mkdir(`./${projectPath}/tests/components`, { recursive: true }, (error) => {
      if (error) throw error;
      functions.map((func) => {
        const { name, inputs, outputs, stateMutability } = func;
        const test = componentTestTemplate(name, inputs, outputs, stateMutability, projectPath).file;
        fs.writeFile(
          `./${projectPath}/tests/components/${name}.test${useTs ? ".tsx" : ".jsx"}`,
          test,
          (error) => {
            if (error) throw error;
          }
        )
      })
    })
  })()
}