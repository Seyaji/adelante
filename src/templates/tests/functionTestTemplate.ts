import { functionImport } from '../utils/imports.js'

export default function functionTestTemplate(name: string, inputs: any, outputs: any, stateMutability: any, inline: boolean) {
  return {
    file:
`${functionImport(name, "../../", inline)}

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
