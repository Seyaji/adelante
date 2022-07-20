import { handleChangeObjectState, useStateObject, handleClickEvent, stateType } from "./utilSnippets.js";
import { functionImport } from "../utils/imports.js";
import { capitalize, propsFilter, funcFormat, dataTypes } from "../../utils.js";
import { Input, CompProps } from '../../types'

const inputGenerator = (inputs: Input[], state: string) => {
  if (inputs.length == 0) return "";
  return `
      <div className="box-inputs">
        ${inputs
          .map(({ name, type }) => {
            return ( 
        `<p>${name}</p>
        <input aria-label="${name}" name="${name}" onChange={handle${capitalize(state)}Change} type="${dataTypes[type]}" placeholder="${name}"/>`);
          })
          .join("\n          ")}
      </div>
`;
};

export default function componentTemplate(name: string, inputs: Input[], outputs: [], inlineFunc: boolean, inline: boolean, useTs: boolean, logs: boolean, props: CompProps[]): string {
  const useState = inputs.length > 0
  const filteredProps: any = propsFilter(props, outputs)
  const handleChange = handleChangeObjectState(useTs, "state", "none", [])
  const handleClick = handleClickEvent(useTs, "logs", name, inputs,  `${props.map((prop) => prop.handle === "none" ? `${prop.name}(["${name}", outcome])` : "").join("\n      ")}`)
  const buttonClick = handleClick.name 
  // `async () => await ${name}(${inputs.map(({ name }) => "state?." + name).join(" ,")})`
  const propsTypeMap = filteredProps.map((prop: any) => `${prop.name}: ${prop.type};`).join("\n  ")
  return(
`${
  inline ? "" : 
`import React${ useState ? `, { useState }` : ""} from 'react';
${functionImport(name, '../', inlineFunc)}
${useTs ? 
  `
${stateType("props", `${propsTypeMap}`, false).function}
${
  useState ?
`
${stateType("state", "[key: string]: string", false ).function}
`
  : "" }
`
  : "" }

`}
${inline ? "export" : "export default"} function ${capitalize(name)}(${useState || logs ? `props ${useTs ? ": Props" : ""}` : ""}) {
  ${useState || logs ? `const { ${filteredProps.map((prop: any) => `${prop.name}`).join(", ")} } = props` : ""}
  ${
    useState ?
`${useStateObject(useTs, "state", "{}").function}
    ${handleChange.function}
    `
    : ""
  }
  ${handleClick.function}
  return (
    <div className="function-box">
      <div className="box-heading">
        <h1>${capitalize(funcFormat(name))}</h1>
        <span className="text-extra"><p>${name}</p></span>${
          inputs.length > 0 ?
          `<p>Function inputs:</p>
          <p>(${inputs
            .map(({ name, type }) => `<span className="text-extra">${type + " " + name}:</span> ${dataTypes[type]}`)
            .join(", ")})</p>`
            : ""}
      </div>
          ${inputGenerator(inputs, "state")}
        <button className="box-button" onClick={${buttonClick}}>${name}</button>
    </div>
  )
}
`)
}
