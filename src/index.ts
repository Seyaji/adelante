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

  const getAdelante = async () => {
    const adelante = await require(`${appRoot}/adelante.json`);
    return adelante;
  };

  const getContract = async (path: string) => {
    const abi = await require(`${appRoot + path}`);
    return abi;
  };

  if (args.includes("--init")) {
    await initialise();
  }

  const adelante = await getAdelante().catch((error: any) => {
    console.log(error);
    missingAdelante();
    process.exit(1);
  });

  const { contractPath, projectPath } = await adelante;

  const contract = await getContract(contractPath).catch((error: any) => {
    console.log(error);
    missingAbi();
    process.exit(1);
  });
  
  const { abi, contractName } = await contract;

  if (args.length === 0) {

    if (adelante && contract) {
      try {
        generator(abi, contractName, adelante);
        fs.copyFile(`${appRoot + contractPath}`, `./${projectPath}/${contractName}.json`, (error) => {
          if (error) {
            console.log("Failed to copy abi.json");
          }
        });
      } catch (error) {
        console.log(error);
        unknownFailure();
        process.exit(1);
      }

    }
  }
})();
