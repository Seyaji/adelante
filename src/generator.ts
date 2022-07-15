// Templates
import componentTemplate from "./templates/componentTemplate.js";
import functionTemplate from "./templates/functionTemplate.js";
import { indexFile, appFile, typeDeclaration, indexHtml, footer, details } from "./templates/pageTemplates.js";
import { inlineComponentImport, inlineFunctionImport } from "./templates/imports.js";
import { handleChangeArray } from "./templates/utilSnippets.js";

// Components
import nav from "./templates/nav.js";
import theme from "./templates/theme.js";
import css from "./templates/css.js";
import metamask from "./templates/metamask.js";

// Utils
import { useTs } from "./utils.js";
import { getContract } from "./templates/utilFunctions.js";
import { generatorGreeting, generatorComplete, inProgress } from "./messages.js";
import { ABI } from "./types";
import fs from "fs";

// Generators
import genFunctions from "./generators/genFunctions.js";
import genComponents from "./generators/genComponents.js";
import genPages from "./generators/genPages.js";
import utilGen from "./generators/utilGen.js";

export default function generator(abi: any, contractName: string, adelante: any) {
  const { inlineFunctions, inlineComponents, contractAddress, useTypescript, projectPath } = adelante;
  generatorGreeting();
  inProgress();

  const functions: ABI[] = abi
    // @ts-ignore
    .filter(({ type }) => type === "function")
    .sort((a: ABI, b: ABI) => (a.inputs.length > b.inputs.length ? -1 : 1));

  const contract = contractAddress;

  const utils = [getContract(contractName, contract, useTypescript)].join("");
  const tsPages = [typeDeclaration()];
  const pages = [
    indexFile(useTypescript),
    appFile(functions, useTypescript, [handleChangeArray(useTypescript, "masterLogs", "data", "none")]),
    indexHtml(contractName),
    metamask(useTypescript),
    nav(useTypescript),
    theme(useTypescript),
    footer(useTypescript),
    details(useTypescript, []),
    css(),
  ].concat(useTypescript ? tsPages : []);

  const functionMap = functions.map(({ name, inputs, outputs, stateMutability }) =>
    functionTemplate(name, inputs, outputs, stateMutability, inlineFunctions, useTypescript)
  );
  const componentMap = functions.map(({ name, inputs, outputs }) =>
    componentTemplate(name, inputs, outputs, inlineFunctions, inlineComponents, useTypescript, true, [
      handleChangeArray(useTypescript, "masterLogs", "data", "none"),
    ])
  );

  genFunctions(functionMap, functions, projectPath, inlineFunctions, useTypescript);

  genComponents(componentMap, functions, projectPath, inlineFunctions, inlineComponents, useTypescript);

  genPages(pages, projectPath);

  utilGen(utils, projectPath, useTypescript);

  generatorComplete();
}
