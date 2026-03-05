import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createOrderService } from '../../../services/order-service.js'

const withTransactionMock = async (_db, cb) => {
    return cb({})
}
const stripeProviderMock = {
    createCheckoutSession: async () => 'session_url',
}

const createCartRepoMock = () => ({
    getCartItems: async (userId) => [
        { id: 1, menuItemId: 2, quantity: 5, priceCents: 1000 },
    ],
})
const createOrderRepoMock = () => ({
    createOrder: async (_userId) => ({ id: 1 }),
    createOrderItem: async (_orderId, _menuItemId, _qty, _priceCents) => ({
        id: 1,
        quantity: 5,
        priceCents: 1000,
    }),
})

const orderService = createOrderService({
    db: {},
    withTransaction: withTransactionMock,
    createOrderRepository: createOrderRepoMock,
    createCartRepository: createCartRepoMock,
    stripeService: stripeProviderMock,
})
test('Order service placeOrder returns stripe session url', async () => {
    const res = await orderService.placeOrder(1)

    console.log('resilt', res)
    assert.ok(typeof res === 'string')
})
