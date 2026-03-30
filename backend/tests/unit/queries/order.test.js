import test from 'node:test'
import assert from 'node:assert'
import { createUserRepository } from '../../../db/repositories/user-repository.js'
import { createCartRepository } from '../../../db/repositories/cart-repository.js'
import { createOrderRepository } from '../../../db/repositories/order-repository.js'
import { createMenuRepository } from '../../../db/repositories/menu-repository.js'

import { pool } from '../../../db/pool.js'

let client = null

test.before(async () => {
    client = await pool.connect()
    client.query('BEGIN')
})

test.after(async () => {
    await client.query('ROLLBACK')
    client.release()
    await pool.end()
})

test('Creates a order', async () => {
    const userRepository = createUserRepository(client)
    const cartRepository = createCartRepository(client)
    const menuRepository = createMenuRepository(client)
    const orderRepository = createOrderRepository(client)
    const user = await userRepository.createUser(
        'Neftaly',
        'Rodriguez',
        'nefrodzv23@gmail.com',
        12345678
    )
    await cartRepository.createCart(user.id).id
    const menuItems = await menuRepository.getAll()
    const menuItem = menuItems[0]
    const cartItem = await cartRepository.upsertCartItem(
        user.id,
        menuItem.id,
        5
    )
    const order = await orderRepository.createOrder(user.id)
    const orderItem = await orderRepository.createOrderItem(
        order.id,
        menuItem.id,
        cartItem.quantity,
        menuItem.price_cents
    )

    assert.ok(order)
    assert.ok(orderItem)
})
