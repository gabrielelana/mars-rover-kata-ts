import { afterEach, beforeEach } from '@jest/globals'
import sinon from 'sinon'

export let sandbox: sinon.SinonSandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})
