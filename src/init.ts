import appRoot from 'app-root-path'
import fs from 'fs';
import inquirer from "inquirer";
import adelante from './templates/adelante.js';
import { initGreeting } from './greetings.js'

export default  async function initialise() {
  initGreeting();

  let exit = false;

  const options: any = [];

  await inquirer
    .prompt({
      type: "list",
      name: "create",
      message: "Would you like to configure an adelante.json?",
      choices: ["Yes", "No"],
    })
    .then((choices) => {
      if (choices["create"] === "No") {
        exit = true
      }
    })

  if (exit) return;

  await inquirer.prompt({
    type: "list",
    name: "language",
    message: "Choose output language:",
    choices: ["TypeScript", "JavaScript"],
  }).then((choices) => {
    choices["language"] === "TypeScript" ? options.push(true) : options.push(false);
  })

  await inquirer.prompt({
    type: "list",
    name: "functions",
    message: "Extract contract functions to individual files?",
    choices: ["Yes", "No"],
  }).then((choices) => {
    choices["functions"] === "Yes" ? options.push(false) : options.push(true);
  })

  await inquirer.prompt({
    type: "list",
    name: "components",
    message: "Extract React components to individual files?",
    choices: ["Yes", "No"],
  }).then((choices) => {
    choices["components"] === "Yes" ? options.push(false) : options.push(true);
  })

  await inquirer.prompt({
    type: "input",
    name: "abiPath",
    message: "Enter path to ABI file:",
  }).then((choices) => {
    options.push(choices["abiPath"]);
  })

  fs.writeFile(`${appRoot}/adelante.json`, adelante(options[0], options[1], options[2], options[3]), (error) => {
    if (error)
      throw error;
  })

}