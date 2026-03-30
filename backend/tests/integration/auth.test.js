import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createUserRepository } from '../../db/repositories/user-repository.js'
import { createAuthService } from '../../services/auth-service.js'
import * as hashService from '../../services/hash-service.js'
import * as tokenService from '../../services/token-service.js'
import { createApp } from '../../app.js'
import { createAuthController } from '../../controllers/auth-controller.js'
import { createAuthRouter } from '../../routers/auth-router.js'
import { pool } from '../../db/pool.js'
import { validateAuthToken } from '../../middlewares/validate-auth-user.js'
import { createCartRepository } from '../../db/repositories/cart-repository.js'
import { createCartService } from '../../services/cart-service.js'
import { createCartController } from '../../controllers/cart-controller.js'
import { createCartRouter } from '../../routers/cart-router.js'

let client
let userRepository
let authService
let authController
let authRouter
let cartRepository
let cartService
let cartController
let cartRouter

test.before(async () => {
    client = await pool.connect()
    userRepository = createUserRepository(client)

    cartRepository = createCartRepository(client)
    cartService = createCartService(cartRepository)

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
    authController = createAuthController(authService)
    authRouter = createAuthRouter(authController, validateAuthToken)
    client.query('BEGIN')
})

test.after(async () => {
    await client.query('ROLLBACK')
    client.release()
    await pool.end()
})

test('Sign up a new  user', async () => {
    const app = createApp({ authRouter })
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'neftaly',
            lastName: 'Rodriguez',
            email: 'neftaly@gmail.com',
            password: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect(201)

    assert.ok(res.body.message)
    assert.ok(res.body.user)
})

test('Sign in user', async () => {
    const app = createApp({ authRouter })
    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'neftaly@gmail.com',
            password: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect(200)
    assert.ok(res.body.message)
    assert.ok(res.body.user)
})

test('Get auth user', async () => {
    const app = createApp({ authRouter })
    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'neftaly@gmail.com',
            password: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect(200)
    const authCookie = res.get('Set-Cookie')

    assert.ok(authCookie)
    const getMeRes = await request(app)
        .get('/api/auth/me')
        .set('Cookie', authCookie)
        .expect('Content-Type', /json/)
        .expect(200)

    assert.ok(getMeRes.body.user)
})
