import test from 'node:test'
import assert from 'node:assert'
import { pool } from '../../../db/pool.js'
import { createUserRepository } from '../../../db/repositories/user-repository.js'
import { createCartRepository } from '../../../db/repositories/cart-repository.js'
import { createMenuRepository } from '../../../db/repositories/menu-repository.js'

let client = null

test.before(async () => {
    client = await pool.connect()
    await client.query('BEGIN')
})

test.after(async () => {
    await client.query('ROLLBACK')
    client.release()
    await pool.end()
})

test(`Cart query returns this structure data format`, async () => {
    const userRepository = createUserRepository(client)
    const cartRepository = createCartRepository(client)
    const menuRepository = createMenuRepository(client)
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

    const cart = await cartRepository.getCartByUserId(user.id)

    assert.ok(cart)
    assert.equal(cart.items.length, 1)
})

test(`Cart item quantity is increased`, async () => {
    const userRepository = createUserRepository(client)
    const cartRepository = createCartRepository(client)
    const menuRepository = createMenuRepository(client)
    const user = await userRepository.createUser(
        'Neftaly',
        'Rodriguez',
        'nefrodzv23@gmail.com',
        12345678
    )
    await cartRepository.createCart(user.id).id
    const menuItems = await menuRepository.getAll()
    const menuItem = menuItems[0]
    await cartRepository.upsertCartItem(user.id, menuItem.id, 5)
    await cartRepository.upsertCartItem(user.id, menuItem.id, 1)
    const cart = await cartRepository.getCartByUserId(user.id)
    assert.ok(cart)
    assert.equal(cart.items.length, 1)
    assert.equal(cart.items[0].quantity, 6)
})

test(`Delete a cart item`, async () => {
    const userRepository = createUserRepository(client)
    const cartRepository = createCartRepository(client)
    const menuRepository = createMenuRepository(client)
    const user = await userRepository.createUser(
        'Neftaly',
        'Rodriguez',
        'nefrodzv23@gmail.com',
        12345678
    )
    await cartRepository.createCart(user.id).id
    const menuItems = await menuRepository.getAll()
    const menuItem = menuItems[0]
    await cartRepository.upsertCartItem(user.id, menuItem.id, 5)
    const deleteRes = await cartRepository.deleteCartItem(user.id, menuItem.id)
    console.log(deleteRes)
    const cart = await cartRepository.getCartByUserId(user.id)
    assert.ok(cart)
    assert.equal(cart.items.length, 0)
})

test('Cart query updates to new quantity value', async () => {
    const userRepository = createUserRepository(client)
    const cartRepository = createCartRepository(client)
    const menuRepository = createMenuRepository(client)
    const user = await userRepository.createUser(
        'Neftaly',
        'Rodriguez',
        'nefrodzv23@gmail.com',
        12345678
    )
    await cartRepository.createCart(user.id).id
    const menuItems = await menuRepository.getAll()
    const menuItem = menuItems[0]
    await cartRepository.upsertCartItem(user.id, menuItem.id, 5)
    const updateResult = await cartRepository.setCartItemQuantity(
        user.id,
        menuItem.id,
        6
    )
    assert.equal(updateResult.quantity, 6)
})
