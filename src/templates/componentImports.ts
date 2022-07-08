import {capitalize} from '../utils.js'

export function componentReact(name: string) {
  return (
`      <${capitalize(name)} />`
  )
}

export function componentImport(name: string,  depth: string) {
  return (
`import ${capitalize(name)} from '${depth}/components/${name}.js';`
  )
}

export function functionImport(name: string, depth: string) {
  return (
`import ${name} from '${depth}/functions/${name}.js';`
  )
}