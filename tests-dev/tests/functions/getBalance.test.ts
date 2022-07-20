
import fs from 'fs'
import getBalance from "../../test-app/functions/getBalance"
describe('Test for getBalance function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    getBalance()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

