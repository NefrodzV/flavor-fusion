import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createApp } from '../../../app.js'
import { createCartController } from '../../../controllers/cart-controller.js'
import { createCartRouter } from '../../../routers/cart-router.js'

const fakeRepo = {
    getCartByUserId: async () => ({ items: [] }),
    upsertCartItem: async () => true,
    updateCartItem: async () => true,
    removeCartItem: async () => true,
}
const cartController = createCartController({ cartRepository: fakeRepo })
// Simulating jwt validation
const authenticate =
    (userId = 1) =>
    (req, _res, next) => {
        req.user = { id: userId }
        next()
    }
const cartRouter = createCartRouter({
    cartController,
    authenticateJWT: authenticate(5),
})
const app = createApp({ cartRouter })
test('GET /api/cart returns cart object and 200', async () => {
    const res = await request(app)
        .get('/api/cart')
        .expect(200)
        .expect('Content-Type', /json/)

    assert.ok(res.body.cart)
})
// TODO: Write the validations middlewares to validete them starting now...
test('POST /api/cart returns cart object and 200', async () => {
    const res = await request(app)
        .get('/api/cart')
        .expect(200)
        .expect('Content-Type', /json/)

    assert.ok(res.body.cart)
    assert.ok(Array.isArray(res.body.cart.items))
})
