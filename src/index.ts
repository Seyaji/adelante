#!/usr/bin/env node
import appRoot from "app-root-path";
import { createRequire } from "module";
export const require = createRequire(import.meta.url);
import fs from "fs";
import initialise from "./init.js";
import generator from "./generator.js";
import { missingAdelante, missingAbi, unknownFailure } from "./messages.js";

(async function fileExists() {
  const args = process.argv.slice(2);

  if (args.filter((arg) => arg.match(/^--init$/)).length === 1) {
    initialise();
  }

  if (args.length === 0) {
    try {
      const adelante = await require(`${appRoot}/adelante.json`);
      const { abiPath, projectPath } = adelante;

      try {
        const { abi, contractName } = await require(`${appRoot + abiPath}`);

        try {
          generator(abi, contractName, adelante);
          fs.copyFile(`${appRoot + abiPath}`, `./${projectPath}/${contractName}.json`, (error) => {
            if (error) {
              console.log("Failed to copy abi.json");
            }
          });
        } catch (error) {
          console.log(error);
          unknownFailure();
        } finally {}

      } catch (error) {
        console.log(error)
        missingAbi()
      }
      finally {}
      
    } catch (error) {
      console.log(error)
      missingAdelante();
    }
  }
})();
