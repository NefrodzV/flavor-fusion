import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createApp } from '../../../app.js'
import { createCartController } from '../../../controllers/cart-controller.js'
import { createCartRouter } from '../../../routers/cart-router.js'

// Mocking app
const createMockApp = (fakeRepo) => {
    let upsertWasCalled = false
    let updateWasCalled = false
    let removeWasCalled = false
    if (!fakeRepo)
        fakeRepo = {
            getCartByUserId: async () => ({ items: [] }),
            upsertCartItem: async () => {
                upsertWasCalled = true
                return true
            },
            setCartItemQuantity: async () => {
                updateWasCalled = true
                return true
            },
            removeCartItem: async () => {
                removeWasCalled = true
                return true
            },
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

    return {
        app,
        flags: {
            updateWasCalled,
            upsertWasCalled,
            removeWasCalled,
        },
    }
}

test('GET /api/cart returns cart object and 200', async () => {
    const { app } = createMockApp()
    const res = await request(app)
        .get('/api/cart')
        .expect(200)
        .expect('Content-Type', /json/)

    assert.ok(res.body.cart)
})

test('POST /api/cart returns cart object and 201 for creating a resource', async () => {
    const { app } = createMockApp()
    const res = await request(app)
        .post('/api/cart/items')
        .send({ menuItemId: 1, quantity: 1 })
        .expect(200)
        .expect('Content-Type', /json/)

    assert.ok(Array.isArray(res.body.cart.items))
})
//
test('POST /api/cart/items returns errors object with messages', async () => {
    const { app, flags } = createMockApp()
    const res = await request(app)
        .post('/api/cart/items')
        .send({ menuItemId: 0, quantity: 0 })
        .expect('Content-Type', /json/)
        .expect(400)
    assert.equal(flags.upsertWasCalled, false)
    assert.ok(res.body.errors)
    assert.equal(Object.keys(res.body.errors).length, 2)
})

test('PATCH/api/cart/items returns cart and status 200', async () => {
    const { app } = createMockApp()
    const res = await request(app)
        .patch('/api/cart/items/1')
        .send({ quantity: 1 })
        .expect(200)
        .expect('Content-Type', /json/)

    assert.ok(res.body.cart)
    assert.ok(res.body.cart.items)
    assert.ok(Array.isArray(res.body.cart.items))
})

// TODO: DO TEST TO validate patch
