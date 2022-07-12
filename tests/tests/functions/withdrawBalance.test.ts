
import fs from 'fs'
import withdrawBalance from "../../test-app/functions/withdrawBalance"
describe('Test for withdrawBalance function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    withdrawBalance()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

