import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createApp } from '../../../app.js'
import { createOrderController } from '../../../controllers/order-controller.js'
import { createOrderRouter } from '../../../routers/order-router.js'
import { OrderNotCancelableError } from '../../../errors/order-not-cancelable-error.js'
import { NotFoundError } from '../../../errors/not-found-error.js'

// TODO MAKE TESTS
function mockApp(fakeOrderService) {
    const calls = { create: null, cancel: null, get: null }
    if (!fakeOrderService) {
        fakeOrderService = {
            createOrder: (userId) => {
                calls.create = { userId }
                return {}
            },
            cancelOrder: (userId, orderId) => {
                calls.cancel = { orderId, userId }
                return {}
            },
            getAllOrders: (userId) => {
                calls.get = { userId }
                return { orders: [] }
            },
        }
    }

    const orderController = createOrderController(fakeOrderService)
    const fakeRequireAuth = (req, res, next) => {
        req.user = { id: 5 }
        next()
    }
    const orderRouter = createOrderRouter(orderController, fakeRequireAuth)
    const app = createApp({ orderRouter })
    return { app, calls }
}
test('GET /api/orders return orders[] and 200', async () => {
    const { app } = mockApp()
    const res = await request(app)
        .get('/api/orders')
        .expect(200)
        .expect('Content-Type', /json/)
    assert.ok(res.body.orders)
})
test('POST /api/orders return order and 201', async () => {
    const { app, calls } = mockApp()
    const res = await request(app)
        .post('/api/orders')
        .expect(201)
        .expect('Content-Type', /json/)
    assert.deepStrictEqual(calls.create, { userId: 5 })
    assert.ok(res.body.order)
})

test('PATCH /api/orders return order and 200', async () => {
    const { app } = mockApp()
    const res = await request(app)
        .patch('/api/orders/1')
        .expect(200)
        .expect('Content-Type', /json/)

    assert.ok(res.body.order)
})

test('PATCH /api/orders returns error and 409', async () => {
    const { app } = mockApp({
        cancelOrder: async (userId, orderId) => {
            throw new OrderNotCancelableError()
            calls.cancel = { orderId, userId }
            return {}
        },
    })
    const res = await request(app)
        .patch('/api/orders/1')
        .expect(409)
        .expect('Content-Type', /json/)
    assert.ok(res.body.error)
})

test('PATCH /api/orders returns error and 409 when not a number param', async () => {
    const { app } = mockApp()
    const res = await request(app)
        .patch('/api/orders/t')
        .expect(400)
        .expect('Content-Type', /json/)
    assert.ok(res.body.error)
})

test('PATCH /api/orders returns Order not found and 404', async () => {
    const { app } = mockApp({
        cancelOrder: async (userId, orderId) => {
            throw new NotFoundError('Order not found')
            calls.cancel = { orderId, userId }
            return {}
        },
    })
    const res = await request(app)
        .patch('/api/orders/1')
        .expect(404)
        .expect('Content-Type', /json/)
    assert.ok(res.body.error)
})
