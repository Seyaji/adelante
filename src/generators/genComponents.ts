import fs from "fs";
import { useTs } from "../utils.js";
import { inlineComponentImport } from "../templates/imports.js";

export default function genComponents(
  componentMap: any[],
  functions: any[],
  projectPath: string,
  inlineFunctions: boolean,
  inlineComponents: boolean,
  useTypescript: boolean
) {
  fs.mkdir(`./${projectPath}/components`, { recursive: true }, (error) => {
    if (error) throw error;
    if (inlineComponents) {
      fs.writeFile(
        `./${projectPath}/components/components${useTs(useTypescript, ".tsx", ".jsx")}`,
        [inlineComponentImport(functions, inlineFunctions, useTypescript), ...componentMap].join(""),
        (error) => {
          if (error) throw error;
        }
      );
    }
    if (!inlineComponents) {
      componentMap.map((component, index) => {
        fs.writeFile(
          `./${projectPath}/components/${functions[index].name}${useTs(useTypescript, ".tsx", ".jsx")}`,
          component,
          (error) => {
            if (error) throw error;
          }
        );
      });
    }
  });
}
