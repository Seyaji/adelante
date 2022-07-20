
import fs from 'fs'
import getNumber from "../../test-app/functions/getNumber"
describe('Test for getNumber function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    getNumber()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

