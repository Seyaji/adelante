import appRoot from "app-root-path";
import { require, useTs } from "./utils.js";

const { inlineFunctions, inlineComponents, contractAddress, useTypescript } = require(`${appRoot}/adelante.json`);

import componentTemplate from "./templates/componentTemplate.js";
import functionTemplate from "./templates/functionTemplate.js";
import { getContract } from "./templates/utilFunctions.js";
import metamask from "./templates/metamask.js";
import { generatorGreeting, generatorComplete, inProgress } from "./messages.js";
import { indexFile, appFile, typeDeclaration, indexHtml } from "./templates/pageTemplates.js";
import { inlineComponentImport, inlineFuncRequire } from "./templates/imports.js";
import { ABI } from "./types";
import fs from "fs";

export default function generator(abi: any, contractName: string) {
  generatorGreeting();
  inProgress();
  // @ts-ignore
  const functions: ABI[] = abi.filter(({ type }) => type === "function");

  const contract = contractAddress;

  const utils = [getContract(contractName, contract, useTypescript)].join("");
  const tsPages = [typeDeclaration()]
  const pages = [
    indexFile(useTypescript),
    appFile(functions, useTypescript),
    indexHtml(contractName),
    metamask(useTypescript),
  ].concat( useTypescript ? tsPages : [] );

  

  const functionMap = functions.map(({ name, inputs, outputs, stateMutability }) =>
    functionTemplate(name, inputs, outputs, stateMutability, inlineFunctions, useTypescript)
  );
  const componentMap = functions.map(({ name, inputs, outputs }) =>
    componentTemplate(name, inputs, outputs, inlineFunctions, inlineComponents, useTypescript)
  );

  (function genFunctions() {
    fs.mkdir(`./${contractName}/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      if (inlineFunctions) {
        fs.writeFile(
          `./${contractName}/functions/functions.ts`,
          [inlineFuncRequire(useTypescript), ...functionMap].join(""),
          (error) => {
            if (error) throw error;
          }
        );
      }
      if (!inlineFunctions) {
        functionMap.map((component, index) => {
          fs.writeFile(
            `./${contractName}/functions/${functions[index].name}${useTs(useTypescript, ".ts", ".js")}`,
            component,
            (error) => {
              if (error) throw error;
            }
          );
        });
      }
    });
  })();

  (function genComponents() {
    fs.mkdir(`./${contractName}/components`, { recursive: true }, (error) => {
      if (error) throw error;
      if (inlineComponents) {
        fs.writeFile(
          `./${contractName}/components/components.tsx`,
          [inlineComponentImport(functions, inlineFunctions, useTypescript), ...componentMap].join(""),
          (error) => {
            if (error) throw error;
          }
        );
      }
      if (!inlineComponents) {
        componentMap.map((component, index) => {
          fs.writeFile(
            `./${contractName}/components/${functions[index].name}${useTs(useTypescript, ".tsx", ".jsx")}`,
            component,
            (error) => {
              if (error) throw error;
            }
          );
        });
      }
    });
  })();

  (function genPages() {
    fs.mkdir(`./${contractName}/`, { recursive: true }, (error) => {
      if (error) throw error;
      pages.map(({ name, file, extension }) => {
        const path = `./${contractName}/${name}${extension}`;
        fs.writeFile(path, file, (error) => {
          if (error) throw error;
        });
      });
    });
  })();

  (function genUtils() {
    fs.mkdir(`./${contractName}/utils`, { recursive: true }, (error) => {
      if (error) throw error;
      fs.writeFile(`./${contractName}/utils/utils${useTs(useTypescript, ".ts", ".js")}`, utils, (error) => {
        if (error) throw error;
      });
    });
  })();

  generatorComplete();
}
