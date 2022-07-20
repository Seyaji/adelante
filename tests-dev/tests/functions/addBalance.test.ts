
import fs from 'fs'
import addBalance from "../../test-app/functions/addBalance"
describe('Test for addBalance function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    addBalance()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

