
import fs from 'fs'
import hello from "../../test-app/functions/hello"
describe('Test for hello function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    hello()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

