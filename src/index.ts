#!/usr/bin/env node
import appRoot from 'app-root-path'
import { require } from './utils.js'
import fs from "fs";
import initialise from "./init.js";
import generator from "./generator.js";


(async function fileExists() {

  const adelanteExists = await fs.existsSync("./adelante.json");
  if (!adelanteExists) {
    await initialise()
  }
  if (adelanteExists) {
    const { abiPath, projectPath } = await require(`${appRoot}/adelante.json`);
    try {
      const { abi, contractName } = await (require(`${appRoot + abiPath}`));
      generator(abi, contractName);

      fs.copyFile(`${appRoot + abiPath}`, `./${projectPath}/${contractName}.json`, (error) => {
        if (error) {
          console.log("Failed to copy abi.json");
        }
      })
    } catch(error) {
      console.log("root: ", appRoot);
      console.log("path: ",abiPath);
      console.log("attempted: ", appRoot + abiPath);
      console.log("<:><:><:><:><:><:><:><:><:><:><:>");
      console.log("");
      console.log("Failed to generate...");
      console.log("Make sure your adelante.json file is configured properly.");
      console.log("");
      console.log("In case of type errors please raise an issue on GitHub :)");
      console.log("");
      console.log("<:><:><:><:><:><:><:><:><:><:><:>");
      console.log(error)
    }
  }
  
})()

