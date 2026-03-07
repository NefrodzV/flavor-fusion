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
    getCartItemsByUserId: async (userId) => [
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
    getOrderById: async () => ({
        status: 'paid',
    }),
    updateStatus: async (orderId) => ({
        orderId,
    }),
    getOrdersByUserId: async (userId) => [],
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
    assert.ok(typeof res === 'string')
})

test('Throws error when cart is empty', async () => {
    const orderService = createOrderService({
        db: {},
        withTransaction: withTransactionMock,
        createOrderRepository: createOrderRepoMock,
        createCartRepository: () => ({
            getCartItemsByUserId: async () => [],
        }),
        stripeService: stripeProviderMock,
    })

    const res = orderService.placeOrder(1)
    assert.rejects(res)
})

test('CancelOrder returns updated order', async () => {
    const res = orderService.cancelOrder(1)
    assert.ok(res)
})

test('GetAll returns array', async () => {
    const res = await orderService.getAllOrders(1)

    assert.ok(Array.isArray(res.orders))
})
