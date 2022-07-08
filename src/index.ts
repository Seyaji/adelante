#!/usr/bin/env node

import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fs from "fs";
import initialise from "./init.js";
import generator from "./generator.js";

(async function fileExists() {
  const exists = fs.existsSync("./adelante.json");
  console.log("exists", exists);
  if (exists) {
    const { abiPath } = await require("../adelante.json");
    const { abi, contractName } = await require(abiPath);
    await generator(abi, contractName);
  }
  if (!exists) {
    await initialise()
  }
})()

