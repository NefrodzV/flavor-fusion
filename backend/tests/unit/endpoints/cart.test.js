import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createApp } from '../../../app.js'
import { createCartController } from '../../../controllers/cart-controller.js'
import { createCartRouter } from '../../../routers/cart-router.js'
import { logError } from '../../../utils/logger.js'

// Mocking app
const createMockApp = (fakeRepo) => {
    const calls = { upsert: null, update: null, remove: null }
    if (!fakeRepo)
        fakeRepo = {
            getCartByUserId: async () => ({ items: [] }),
            upsertCartItem: async (userId, menuItemId, quantity) => {
                calls.upsert = { userId, menuItemId, quantity }
                return true
            },
            setCartItemQuantity: async (userId, menuItemId, quantity) => {
                calls.update = { userId, menuItemId, quantity }
                return true
            },
            removeCartItem: async () => {
                remove = {}
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
        calls,
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

test('POST /api/cart returns cart object and 200', async () => {
    const { app, calls } = createMockApp()
    const res = await request(app)
        .post('/api/cart/items')
        .send({ menuItemId: 1, quantity: 1 })
        .expect(200)
        .expect('Content-Type', /json/)

    assert.deepStrictEqual(calls.upsert, {
        userId: 5,
        menuItemId: 1,
        quantity: 1,
    })
    assert.ok(Array.isArray(res.body.cart.items))
})
//
test('POST /api/cart/items returns errors object with messages', async () => {
    const { app, calls } = createMockApp()
    const res = await request(app)
        .post('/api/cart/items')
        .send({ menuItemId: 0, quantity: 0 })
        .expect('Content-Type', /json/)
        .expect(400)
    assert.deepEqual(calls.upsert, null)
    assert.ok(res.body.errors)
    assert.equal(Object.keys(res.body.errors).length, 2)
})

test('PATCH/api/cart/items/:menuItemId returns cart and status 200', async () => {
    const { app, calls } = createMockApp()
    const res = await request(app)
        .patch('/api/cart/items/1')
        .send({ quantity: 1 })
        .expect(200)
        .expect('Content-Type', /json/)

    assert.deepStrictEqual(calls.update, {
        userId: 5,
        quantity: 1,
        menuItemId: 1,
    })
    assert.ok(res.body.cart)
    assert.ok(res.body.cart.items)
    assert.ok(Array.isArray(res.body.cart.items))
})

// TODO: DO TEST TO validate patch
test('PATCH /api/cart/items/:menuItemId returns errors and 400', async () => {
    const { app, calls } = createMockApp()
    const res = await request(app)
        .patch('/api/cart/items/1')
        .send({ quantity: 0 })
        .expect(400)
        .expect('Content-Type', /json/)

    assert.equal(calls.update, null)
    assert.ok(res.body.errors)
    assert.equal(Object.keys(res.body.errors).length, 1)
})

test('PATCH /api/cart/items/1 returns errors and 400 when no body', async () => {
    const { app, calls } = createMockApp()
    const res = await request(app)
        .patch('/api/cart/items/1')
        .expect(400)
        .expect('Content-Type', /json/)

    assert.equal(calls.update, null)
    assert.ok(res.body.errors)
    assert.ok(res.body.errors.body)
    assert.equal(Object.keys(res.body.errors).length, 1)
})

test('PATCH /api/cart/items/t returns errors and 400', async () => {
    const { app, calls } = createMockApp()
    const res = await request(app)
        .patch('/api/cart/items/t')
        .send({ quantity: 1 })
        .expect(400)
        .expect('Content-Type', /json/)
    assert.equal(calls.update, null)
    assert.ok(res.body.errors)
    assert.ok(res.body.errors.menuItemId)
})
