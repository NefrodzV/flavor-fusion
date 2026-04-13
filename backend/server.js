import { createApp } from './app.js'
import { log } from './utils/logger.js'
import { env } from './config/env.js'
import { createUserRepository } from './db/repositories/user-repository.js'
import { createOrderRepository } from './db/repositories/order-repository.js'
import { createCartRepository } from './db/repositories/cart-repository.js'
import { createMenuRepository } from './db/repositories/menu-repository.js'
import { createAuthService } from './services/auth-service.js'
import { createCartService } from './services/cart-service.js'
import * as hashService from './services/hash-service.js'
import { createOrderService } from './services/order-service.js'
import { createStripePaymentProvider } from './services/stripe-service.js'
import * as tokenService from './services/token-service.js'
import { createAuthController } from './controllers/auth-controller.js'
import { createCartController } from './controllers/cart-controller.js'
import { createMenuController } from './controllers/menu-controller.js'
import { createOrderController } from './controllers/order-controller.js'
import { createWebhookController } from './controllers/webhook-controller.js'
import { createAuthRouter } from './routers/auth-router.js'
import { createMenuRouter } from './routers/menu-router.js'
import { createOrderRouter } from './routers/order-router.js'
import { createStripeHookRouter } from './routers/stripe-hooks-router.js'
import { createCartRouter } from './routers/cart-router.js'
import { withTransaction } from './db/pool.js'
import { pool } from './db/pool.js'
import { validateAuthToken } from './middlewares/validate-auth-user.js'
import Stripe from 'stripe'
//TODO : Initialize all objects for app

const userRepository = createUserRepository(pool)
const orderRepository = createOrderRepository(pool)
const cartRepository = createCartRepository(pool)
const menuRepository = createMenuRepository(pool)

const cartService = createCartService(cartRepository)
const authService = createAuthService({
    userRepository,
    tokenService,
    hashService,
    cartService,
})
const stripeService = createStripePaymentProvider(
    env.stripeSecret,
    env.frontendDomain
)
const orderService = createOrderService({
    db: pool,
    withTransaction,
    createOrderRepository,
    createCartRepository,
    stripeService,
})

const authController = createAuthController(authService, cartService)
const cartController = createCartController(cartService)
const menuController = createMenuController({ menuRepository })
const orderController = createOrderController(orderService)
const webhookController = createWebhookController(orderService)

const authRouter = createAuthRouter(authController, validateAuthToken)
const menuRouter = createMenuRouter({ menuController })
const orderRouter = createOrderRouter(orderController, validateAuthToken)
const stripeRouter = createStripeHookRouter(webhookController)
const cartRouter = createCartRouter({
    cartController,
    authenticateJWT: validateAuthToken,
})

const app = createApp({
    authRouter,
    menuRouter,
    cartRouter,
    orderRouter,
    stripeWebhookRouter: stripeRouter,
})
app.listen(env.port, () => {
    log(`Server is listening in http://localhost:${env.port}`)
})
