import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createCartRepository } from '../../db/repositories/cart-repository.js'
import { createCartService } from '../../services/cart-service.js'
import { createCartController } from '../../controllers/cart-controller.js'
import { createCartRouter } from '../../routers/cart-router.js'
import { pool } from '../../db/pool.js'
import { validateAuthToken } from '../../middlewares/validate-auth-user.js'
import { createUserRepository } from '../../db/repositories/user-repository.js'
import { createAuthService } from '../../services/auth-service.js'
import * as hashService from '../../services/hash-service.js'
import * as tokenService from '../../services/token-service.js'
import { createMenuRepository } from '../../db/repositories/menu-repository.js'
import { createMenuController } from '../../controllers/menu-controller.js'
import { createMenuRouter } from '../../routers/menu-router.js'
import { createApp } from '../../app.js'
import { createAuthController } from '../../controllers/auth-controller.js'
import { createAuthRouter } from '../../routers/auth-router.js'

let client
let cartRepository
let cartService
let cartController
let cartRouter
let app
let userRepository
let authService
let authController
let authRouter
let menuRepository
let menuController
let menuRouter

let authCookie
test.before(async () => {
    client = await pool.connect()
    await client.query('BEGIN')
    userRepository = createUserRepository(client)
    cartRepository = createCartRepository(client)
    cartService = createCartService(cartRepository)
    console.log(cartService)
    cartController = createCartController(cartService)
    cartRouter = createCartRouter({
        cartController,
        authenticateJWT: validateAuthToken,
    })
    authService = createAuthService({
        userRepository,
        tokenService,
        hashService,
        cartService,
    })
    menuRepository = createMenuRepository(client)
    menuController = createMenuController({ menuRepository })
    menuRouter = createMenuRouter({ menuController })
    authController = createAuthController(authService)
    authRouter = createAuthRouter(authController, validateAuthToken)
    app = createApp({ cartRouter, authRouter, menuRouter })
    const res = await request(app).post('/api/auth/register').send({
        name: 'neftaly',
        lastName: 'Rodriguez',
        email: 'neftaly@gmail.com',
        password: '12345678',
    })

    authCookie = res.get('Set-Cookie')
    console.log(authCookie)
})

test.after(async () => {
    await client.query('ROLLBACK')
    client.release()
    await pool.end()
})

test('Gets all cart items', async () => {
    const res = await request(app)
        .get('/api/cart')
        .set('Cookie', authCookie)
        .expect(200)
    assert.ok(res.body.cart)
    assert.ok(Array.isArray(res.body.cart.items))
})

test('Set a item to the user cart', async () => {
    const resMenu = await request(app).get('/api/menu').expect(200)
    const menuItem = resMenu.body.menu[0]
    const createItemRes = await request(app)
        .post('/api/cart/items')
        .set('Cookie', authCookie)
        .send({ menuItemId: menuItem.id, quantity: 5 })
        .expect(200)
    await request(app)
        .post('/api/cart/items')
        .set('Cookie', authCookie)
        .send({ menuItemId: menuItem.id, quantity: 5 })
        .expect(200)
    const getUpdatedCartRes = await request(app)
        .get('/api/cart')
        .set('Cookie', authCookie)
        .expect(200)
    assert.ok(Array.isArray(getUpdatedCartRes.body.cart.items))
    assert.ok(getUpdatedCartRes.body.cart.items.length > 0)
    assert.ok(getUpdatedCartRes.body.cart)
})
