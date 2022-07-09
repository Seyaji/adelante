import appRoot from 'app-root-path'
import { require } from './utils.js'

const exists = fs.existsSync("./adelante.json");
// @ts-ignore
const { inlineFunctions, inlineComponents, contractAddress } = ((exists: boolean) => {
  if (exists) {
    return require(`${appRoot}/adelante.json`)
  }
  if(!exists) {
    console.log("<:><:><:><:><:><:><:><:><:><:><:>");
    console.log("");
    console.log("adelante.json not found, continuing with minimum default settings.");
    console.log("");
    console.log("<:><:><:><:><:><:><:><:><:><:><:>");
    return { inlineFunctions: false, inlineComponents: false, contractAddress: "ENTER_CONTRACT_ADDRESS_HERE" }
  }
});

import componentTemplate from "./templates/componentTemplate.js";
import functionTemplate from "./templates/functionTemplate.js";
import { getContract } from "./templates/utilFunctions.js";
import { generatorGreeting, generatorComplete } from "./greetings.js";
import { indexFile, appFile, typeDeclaration, indexHtml } from "./templates/pageTemplates.js";
import { inlineComponentImport, inlineFuncRequire } from './templates/imports.js';
import fs from "fs";


export default function generator(abi: any, contractName: string) {
  generatorGreeting()
  // @ts-ignore
  const functions: ABI[] = abi.filter(({ type }) => type === "function");

  const contract = contractAddress;


  const utils = [getContract(contractName, contract)].join("");
  const pages = [indexFile, appFile(functions), typeDeclaration(), indexHtml(contractName)];

  const functionMap = functions.map(({ name, inputs, outputs, stateMutability }) =>
    functionTemplate(name, inputs, outputs, stateMutability, inlineFunctions)
  );
  const componentMap = functions.map(({ name, inputs, outputs }) => componentTemplate(name, inputs, outputs, inlineFunctions, inlineComponents));

  (function genFunctions() {
    fs.mkdir(`./${contractName}/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      if (inlineFunctions) {
        fs.writeFile(`./${contractName}/functions/functions.ts`, [inlineFuncRequire(), ...functionMap].join(""), (error) => {
          if (error) throw error;
        });
      }
      if (!inlineFunctions) {
        functionMap.map((component, index) => {
          fs.writeFile(`./${contractName}/functions/${functions[index].name}.ts`, component, (error) => {
            if (error) throw error;
          });
        });
      }
    });
  })();

  (function genComponents() {
    fs.mkdir(`./${contractName}/components`, { recursive: true }, (error) => {
      if (error) throw error;
      if (inlineComponents) {
        fs.writeFile(`./${contractName}/components/components.tsx`, [inlineComponentImport(functions, inlineFunctions), ...componentMap].join(""), (error) => {
          if (error) throw error;
        });
      }
      if(!inlineComponents) {
        componentMap.map((component, index) => {
          fs.writeFile(`./${contractName}/components/${functions[index].name}.tsx`, component, (error) => {
            if (error) throw error;
          });
        });
      }
    });
  })();

  (function genPages() {
    fs.mkdir(`./${contractName}/`, { recursive: true }, (error) => {
      if (error) throw error;
      pages.map(({ name, file, extension }) => {
        fs.writeFile(`./${contractName}/${name}${extension}`, file, (error) => {
          if (error) throw error;
        });
      });
    });
  })();

  (function genUtils() {
    fs.mkdir(`./${contractName}/utils`, { recursive: true }, (error) => {
      if (error) throw error;
      fs.writeFile(`./${contractName}/utils/utils.ts`, utils, (error) => {
        if (error) throw error;
      });
    });
  })();

  generatorComplete()
}

