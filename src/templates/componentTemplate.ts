import { handleChangeObjectState, useStateObject } from "./utilSnippets.js";
import { functionImport } from "./imports.js";
import { capitalize } from "../utils.js";
import dataTypes from "../templates/dataTypes.js";
import { Input } from '../types'

const inputGenerator = (inputs: Input[]) => {
  if (inputs.length == 0) return "";
  return `
      <div className="box-inputs">
        ${inputs
          .map(({ name, type }) => {
            return ( 
        `<p>${name}</p>
        <input name="${name}" onChange={handleChange} type="${dataTypes[type]}" placeholder="${name}"/>`);
          })
          .join("\n          ")}
      </div>
`;
};

export default function componentTemplate(name: string, inputs: Input[], outputs: [], inlineFunc: boolean, inline: boolean, useTs: boolean): string {
  const useState = inputs.length > 0 || outputs.length > 0
  return(
`${
  inline ? "" : 
`import React${ useState ? `, { useState }` : ""} from 'react';
${functionImport(name, '..', inlineFunc)}
${ useState ? 
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
    useState ?
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
          `<p>Function inputs:</p>
          <p>(${inputs
            .map(({ name, type }) => `${type + " " + `${name}`}: ${dataTypes[type]}`)
            .join(", ")})</p>`
            : ""}
      </div>
          ${inputGenerator(inputs)}
        <button className="box-button" onClick={async () => await ${name}(${inputs.map(({ name }) => "state?." + name).join(" ,")})} value="" >${name}</button>
    </div>
  )
}
`)
}
