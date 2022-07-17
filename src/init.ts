import appRoot from "app-root-path";
import { writeFile } from "fs/promises";
import inquirer from "inquirer";
import { adelante, defaultSettings } from "./templates/adelante.js";
import { setupComplete, initGreeting, failedDefaultSettings } from "./messages.js";

export default async function initialise() {
  initGreeting();

  let exit = false;

  const options: any = {};

  await inquirer
    .prompt({
      type: "list",
      name: "create",
      message: "Would you like to configure an adelante.json?",
      choices: ["Yes", "No (this will make one with default settings)"],
    })
    .then((choices) => {
      if (choices["create"] === "No") {
        try {
          const controller = new AbortController();
          const { signal } = controller;
          writeFile(`${appRoot}/adelante.json`, defaultSettings(), { signal });
          exit = true;
        } catch (error) {
          console.log(error);
          failedDefaultSettings();
          process.exit(1);
        }
      }
    });

  if (exit) {
    return;
  }

  await inquirer
    .prompt({
      type: "list",
      name: "language",
      message: "Choose output language:",
      choices: ["TypeScript", "JavaScript"],
    })
    .then((choices) => {
      options.language = choices["language"] === "TypeScript" ? true : false;
    });

  await inquirer
    .prompt({
      type: "list",
      name: "functions",
      message: "Extract contract functions to individual files?",
      choices: ["Yes", "No"],
    })
    .then((choices) => {
      options.functions = choices["functions"] === "Yes" ? false : true;
    });

  await inquirer
    .prompt({
      type: "list",
      name: "components",
      message: "Extract React components to individual files?",
      choices: ["Yes", "No"],
    })
    .then((choices) => {
      options.components = choices["components"] === "Yes" ? false : true;
    });

  await inquirer
    .prompt({
      type: "input",
      name: "abiPath",
      message: "Enter path to ABI file:",
    })
    .then((choices) => {
      options.abiPath = choices["abiPath"];
    });
  await inquirer
    .prompt({
      type: "input",
      name: "projectPath",
      message: "Enter path to project directory",
    })
    .then((choices) => {
      options.projectPath = choices["projectPath"];
    });

  await inquirer
    .prompt({
      type: "input",
      name: "contract",
      message: "Paste your contract address (leave blank if you want to add it later):",
    })
    .then((choices) => {
      options.contract = choices["contract"];
    });

  try {
    const controller = new AbortController();
    const { signal } = controller;
    await writeFile(
      `${appRoot}/adelante.json`,
      adelante(
        options.language,
        options.functions,
        options.components,
        options.abiPath,
        options.contract,
        options.projectPath
      ),
      { signal }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  setupComplete();
}
