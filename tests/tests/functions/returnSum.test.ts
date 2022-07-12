
import fs from 'fs'
import returnSum from "../../test-app/functions/returnSum"
describe('Test for returnSum function', () => {
  it('should call the function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    returnSum()
    expect(consoleSpy.mock.calls.length).toBe(1);
  })

})

