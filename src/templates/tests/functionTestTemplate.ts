import { functionImport } from '../utils/imports.js'

export default function functionTestTemplate(name: string, inputs: any, outputs: any, stateMutability: any, projectPath: string) {
  return {
    file:
`import ${name} from "../../test-app/functions/${name}"

describe('Test for ${name} function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    ${name}()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

`
  }
}