
import fs from 'fs'
import hello from "../../test-app/functions/hello"
describe('Test for hello function', () => {
  it('should call the function', () => {
    hello()
  })
})

