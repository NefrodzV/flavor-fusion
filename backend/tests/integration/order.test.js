import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createCartRepository } from '../../db/repositories/cart-repository.js'
import { createCartService } from '../../services/cart-service.js'
import { createCartController } from '../../controllers/cart-controller.js'
import { createCartRouter } from '../../routers/cart-router.js'
import { pool, withTransaction } from '../../db/pool.js'
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
import { createOrderRepository } from '../../db/repositories/order-repository.js'
import { createOrderController } from '../../controllers/order-controller.js'
import { createStripePaymentProvider } from '../../services/stripe-service.js'
import { createOrderRouter } from '../../routers/order-router.js'
import { env } from '../../config/env.js'
import { createOrderService } from '../../services/order-service.js'
import { createWebhookController } from '../../controllers/webhook-controller.js'
import { createStripeHookRouter } from '../../routers/stripe-hooks-router.js'
import Stripe from 'stripe'
const stripe = new Stripe(env.stripeSecret)
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
let orderRepository
let orderService
let orderController
let orderRouter
let stripeService
let authUser
let authCookie
test.before(async () => {
    client = await pool.connect()
    await client.query('BEGIN')
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
    menuRepository = createMenuRepository(client)
    menuController = createMenuController({ menuRepository })
    menuRouter = createMenuRouter({ menuController })
    authController = createAuthController(authService)
    authRouter = createAuthRouter(authController, validateAuthToken)

    orderRepository = createOrderRepository(client)
    stripeService = createStripePaymentProvider(
        env.stripeSecret,
        'http://localhost:3000'
    )
    orderService = createOrderService({
        db: pool,
        withTransaction,
        createCartRepository,
        createOrderRepository,
        stripeService,
        existingClient: client,
    })
    orderController = createOrderController(orderService)
    orderRouter = createOrderRouter(orderController, validateAuthToken)
    const webhookController = createWebhookController(orderService)
    const stripeHookRouter = createStripeHookRouter(webhookController)
    app = createApp({
        cartRouter,
        authRouter,
        menuRouter,
        orderRouter,
        stripeWebhookRouter: stripeHookRouter,
    })

    const res = await request(app).post('/api/auth/register').send({
        name: 'neftaly',
        lastName: 'Rodriguez',
        email: 'neftaly@gmail.com',
        password: '12345678',
    })
    console.log(res.body)
    authUser = res.body.user

    authCookie = res.get('Set-Cookie')
})

test.after(async () => {
    await client.query('ROLLBACK')
    client.release()
    await pool.end()
})

test('POST /api/orders returns url for stripe', async () => {
    const resMenu = await request(app).get('/api/menu').expect(200)
    const menuItem = resMenu.body.menu[0]
    await request(app)
        .post('/api/cart/items')
        .set('Cookie', authCookie)
        .send({ menuItemId: menuItem.id, quantity: 5 })
        .expect(200)
    const orderRes = await request(app)
        .post('/api/orders')
        .set('Cookie', authCookie)
        .expect(201)
    assert.ok(orderRes.body.url)
    assert.ok(typeof orderRes.body.url === 'string')
})

// This probably can go into its own test file but since its only one
test('POST /api/stripe-hooks/webhook', async () => {
    const order = await orderRepository.createOrder(authUser.id)

    const mockEvent = {
        id: 'evt_test_123',
        object: 'event',
        type: 'checkout.session.completed',
        data: {
            object: {
                id: 'cs_test_mock_session',
                object: 'checkout.session',
                customer: 'cus_test_123',
                client_reference_id: 'user_99',
                payment_status: 'paid',
                status: 'complete',
                amount_total: 2000,
                currency: 'usd',
            },
        },
    }

    const payload = JSON.stringify({
        ...mockEvent,
        data: {
            object: {
                ...mockEvent.data.object,
                client_reference_id: authUser.id,
                metadata: {
                    order_id: order.id,
                },
            },
        },
    })

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payload,
        secret: env.endpointSecret,
    })

    const res = await request(app)
        .post('/api/stripe-hooks/webhook')
        .set('stripe-signature', header)
        .set('Content-Type', 'application/json')
        .send(payload)

    assert.equal(res.statusCode, 200)
})
