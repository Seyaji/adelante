export default function functionTestTemplate(name: string, inputs: any, outputs: any, stateMutability: any) {
  return {
    file:
`
import fs from 'fs'
import ${name} from "../../test-app/functions/${name}"
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