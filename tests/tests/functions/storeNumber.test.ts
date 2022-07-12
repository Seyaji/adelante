
import fs from 'fs'
import storeNumber from "../../test-app/functions/storeNumber"
describe('Test for storeNumber function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    storeNumber()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

