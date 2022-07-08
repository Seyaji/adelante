import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { abiPath } = require('../adelante.json')
const { abi, contractName } = require(abiPath)
import componentTemplate from "./templates/componentTemplate.js";
import functionTemplate from "./templates/functionTemplate.js";
import { getContract } from "./templates/utilFunctions.js";
import { indexFile, appFile, typeDeclaration, indexHtml } from "./templates/pageTemplates.js";
import fs from "fs";
import { ABI } from "./types";

(function functionCreate(abi: any) {
  // @ts-ignore
  const functions: ABI[] = abi.filter(({ type }) => type === "function");
  // console.log(util.inspect(functions, { showHidden: false, depth: null, colors: true }));

  const contractAddress = "0x2582B38c522D776b4a68726e941617eCc3259241";

  const nameContract = contractName;

  const utils = [getContract(nameContract, contractAddress)].join("");
  const pages = [indexFile, appFile(functions), typeDeclaration(), indexHtml(nameContract)];


  const functionMap = functions.map(({ name, inputs, outputs, stateMutability }) =>
    functionTemplate(name, inputs, outputs, stateMutability)
  );
  const componentMap = functions.map(({ name, inputs, outputs }) => componentTemplate(name, inputs, outputs));

  (function genComponents() {
    fs.mkdir(`./${nameContract}/components`, { recursive: true }, (error) => {
      if (error) throw error;
      componentMap.map((component, index) => {
        fs.writeFile(`./${nameContract}/components/${functions[index].name}.tsx`, component, (error) => {
          if (error) throw error;
        });
      });
    });
  })();

  (function genPages() {
    fs.mkdir(`./${nameContract}/`, { recursive: true }, (error) => {
      if (error) throw error;
      pages.map(({ name, file, extension }) => {
        fs.writeFile(`./${nameContract}/${name}${extension}`, file, (error) => {
          if (error) throw error;
        });
      });
    });
  })();

  (function genFunctions() {
    fs.mkdir(`./${nameContract}/functions`, { recursive: true }, (error) => {
      if (error) throw error;
      functionMap.map((component, index) => {
        fs.writeFile(`./${nameContract}/functions/${functions[index].name}.ts`, component, (error) => {
          if (error) throw error;
        });
      });
    });
  })();

  (function genUtils() {
    fs.mkdir(`./${nameContract}/utils`, { recursive: true }, (error) => {
      if (error) throw error;
      fs.writeFile(`./${nameContract}/utils/utils.ts`, utils, (error) => {
        if (error) throw error;
      });
    });
  })();
})(abi);
