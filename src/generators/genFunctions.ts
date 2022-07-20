import fs from "fs";
import { useTs } from "../utils.js";
import { inlineFunctionImport } from "../templates/utils/imports.js";

export default function genFunctions(
  functionMap: any[],
  functions: any[],
  projectPath: string,
  inlineFunctions: boolean,
  useTypescript: boolean
) {
  fs.mkdir(`./${projectPath}/functions`, { recursive: true }, (error) => {
    if (error) throw error;
    if (inlineFunctions) {
      fs.writeFile(
        `./${projectPath}/functions/functions${useTs(useTypescript, ".ts", ".js")}`,
        [inlineFunctionImport(), ...functionMap].join(""),
        (error) => {
          if (error) throw error;
        }
      );
    }
    if (!inlineFunctions) {
      functionMap.map((component, index) => {
        fs.writeFile(
          `./${projectPath}/functions/${functions[index].name}${useTs(useTypescript, ".ts", ".js")}`,
          component,
          (error) => {
            if (error) throw error;
          }
        );
      });
    }
  });
}
