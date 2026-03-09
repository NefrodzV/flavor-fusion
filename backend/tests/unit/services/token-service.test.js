import test from 'node:test'
import assert from 'node:assert'
import { sign, verify } from '../../../services/token-service.js'

test('JWT token is created', async () => {
    const secret = 'test-secret'
    const payload = { userId: 1 }

    const token = await sign(payload, secret)

    assert.ok(token)
    assert.equal(typeof token, 'string')
})

test('JWT token verifies correctly', async () => {
    const secret = 'test-secret'
    const payload = { userId: 1 }

    const token = await sign(payload, secret)

    const decoded = await verify(token, secret)

    assert.equal(decoded.userId, 1)
})
