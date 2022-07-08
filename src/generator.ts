import componentTemplate from "./templates/componentTemplate.js";
import functionTemplate from "./templates/functionTemplate.js";
import { getContract } from "./templates/utilFunctions.js";
import { generatorGreeting, generatorComplete } from "./greetings.js";
import { indexFile, appFile, typeDeclaration, indexHtml } from "./templates/pageTemplates.js";
import fs from "fs";


export default function generator(abi: any, contractName: string) {
  generatorGreeting()
  // @ts-ignore
  const functions: ABI[] = abi.filter(({ type }) => type === "function");
  // console.log(util.inspect(functions, { showHidden: false, depth: null, colors: true }));

  const contractAddress = "0x2582B38c522D776b4a68726e941617eCc3259241";


  const utils = [getContract(contractName, contractAddress)].join("");
  const pages = [indexFile, appFile(functions), typeDeclaration(), indexHtml(contractName)];

  const functionMap = functions.map(({ name, inputs, outputs, stateMutability }) =>
    functionTemplate(name, inputs, outputs, stateMutability)
  );
  const componentMap = functions.map(({ name, inputs, outputs }) => componentTemplate(name, inputs, outputs));

  (function genComponents() {
    fs.mkdir(`./${contractName}/components`, { recursive: true }, (error) => {
      if (error) throw error;
      componentMap.map((component, index) => {
        fs.writeFile(`./${contractName}/components/${functions[index].name}.tsx`, component, (error) => {
          if (error) throw error;
        });
      });
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

  (function genFunctions() {
    fs.mkdir(`./${contractName}/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      functionMap.map((component, index) => {
        fs.writeFile(`./${contractName}/functions/${functions[index].name}.ts`, component, (error) => {
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

// @ts-ignore
