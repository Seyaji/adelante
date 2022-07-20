// Templates
import componentTemplate from "./templates/react/componentTemplate.js";
import functionTemplate from "./templates/react/functionTemplate.js";
import { indexFile, appFile, typeDeclaration, indexHtml, footer, details } from "./templates/files/pageTemplates.js";
import { handleChangeArray } from "./templates/react/utilSnippets.js";

// Components
import nav from "./templates/react/nav.js";
import theme from "./templates/files/theme.js";
import css from "./templates/files/css.js";
import metamask from "./templates/react/metamask.js";

// Utils
import { getContract } from "./templates/utils/utilFunctions.js";
import { generatorGreeting, generatorComplete, inProgress, unknownFailure } from "./messages.js";
import { ABI } from "./types";

// Generators
import genFunctions from "./generators/genFunctions.js";
import genComponents from "./generators/genComponents.js";
import genPages from "./generators/genPages.js";
import utilGen from "./generators/utilGen.js";
import testGenerator from "./generators/testGenerator.js";

export default function generator(abi: ABI[], contractName: string, adelante: any) {
  const { 
    inlineFunctions,
    inlineComponents,
    contractAddress,
    useTypescript,
    projectPath,
    generateTests 
  } = adelante;
  generatorGreeting();
  inProgress();

  const functions: ABI[] = abi
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

  try {
    genFunctions(functionMap, functions, projectPath, inlineFunctions, useTypescript);
    genComponents(componentMap, functions, projectPath, inlineFunctions, inlineComponents, useTypescript);
    genPages(pages, projectPath);
    utilGen(utils, projectPath, useTypescript);

    if (generateTests) {
      testGenerator(functions, projectPath, useTypescript);
    }

    generatorComplete();
  } catch (error) {
    console.log(error);
    unknownFailure();
  }
}
