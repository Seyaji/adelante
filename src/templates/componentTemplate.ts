import { handleChangeObjectState, useStateObject } from "./utilSnippets.js";
import { functionImport } from "./imports.js";
import { capitalize } from "../utils.js";
import dataTypes from "../templates/dataTypes.js";
import { Input } from '../types'

const inputGenerator = (inputs: Input[]) => {
  if (inputs.length == 0) return "";
  return `
        <div id="inputs">
          ${inputs
            .map(({ name, type }) => {
              return `<input name="${name}" onChange={handleChange} type="${dataTypes[type]}" placeholder="${name}"/>`;
            })
            .join("\n          ")}
        </div>
`;
};

export default function componentTemplate(name: string, inputs: Input[], outputs: [], inlineFunc: boolean, inline: boolean, useTs: boolean): string {
  return(
`${
  inline ? "" : 
`import React${inputs.length > 0 ? `, { useState }` : ""} from 'react';
${functionImport(name, '..', inlineFunc)}
${ inputs.length > 0 && useTs ? 
  `
  type State = {
    [key: string]: string
  }
  `
  : ""
}`
}
${inline ? "export" : "export default"} function ${capitalize(name)}() {
  ${
    inputs.length > 0 ?
    `  ${useStateObject(useTs)}

    ${handleChangeObjectState(useTs)}
    `
    : ""
  }
  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>${name}</h1>${
          inputs.length > 0 ?
          `<p>Function inputs: (${inputs
            .map(({ name, type }) => `${type + " " + `${name}`}: ${dataTypes[type]}`)
            .join(", ")})</p>
            ${inputGenerator(inputs)}`
          : ""}
      </div>
      <button className="box button" onClick={async () => await ${name}(${inputs.map(({ name }) => "state?." + name).join(" ,")})} value="" >${name}</button>
    </div>
  )
}
`)
}
