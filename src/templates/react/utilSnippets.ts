//  Util Snippets
import { capitalize } from "../../utils.js";
import { Input } from '../../types'
export const useStateObject = (useTs: boolean, stateName: string, initial: any) => {
  return {
    function:
    `const [${stateName}, set${capitalize(stateName)}] = useState${useTs ? `<${capitalize(stateName)}>` : `` }(${initial});`
  }
}

export const stateType = (stateName: string, type: string, single: boolean) => {
  return {
    single: single,
    function:
`${
  single ? 
`type ${capitalize(stateName)} = ${type};`
 : `type ${capitalize(stateName)} = {
  ${type}
};`}`
  }
}

export const handleChangeObjectState = (useTs: boolean, stateName: string, handle: any, actions: any) => {
  return {
    name : `handle${capitalize(stateName)}Change`,
    type: `(e: any) => void`,
    handle: handle,
    function:
`
  const handle${capitalize(stateName)}Change = (event${useTs ? `: React.ChangeEvent<HTMLInputElement>` : ""}) => {
    const { name, value } = event.target
    set${capitalize(stateName)}((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
    ${actions.map((action: string) => action)}
  }`}}; 

export const handleChangeArray = (useTs: boolean, stateName: string, data: any, handle: any) => {
  return {
    name: `handle${capitalize(stateName)}Change`,
    type: `(data: any) => void`,
    handle: handle,
    function:
`  const handle${capitalize(stateName)}Change = (data${ useTs ? ": any" : ""}) => {
    set${capitalize(stateName)}(prevState => [${data}, ...prevState])
  }`
  }
}


export const handleClickEvent = (useTs: boolean, stateName: string, name: string, inputs: Input[], func: string) => {
  return {
    name : `handle${capitalize(stateName)}Click`,
    type: `(e: any) => void`,
    function:
`
  const handle${capitalize(stateName)}Click = async (event${ useTs ? ": any" : ""}) => {
    const data = await ${name}(${inputs.map(({ name }) => "state?." + name).join(" ,")})
    const outcome = data === "${name} failed" ? "failed" : \`success: \${JSON.stringify(data)}\`
    ${func}
  }
`
  }
}


export const logs = (key: string, value: string) => {
  return (
`
 <div className="log-box">
    <p className="log-text">${key}: ${value}</p>
 </div>
`
  )
}