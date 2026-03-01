import { Router } from 'express'

import { withAsyncHandler } from '../utils/async-handler.js'
import { validateCancelOrder } from '../middlewares/order-validation-middleware.js'

export function createOrderRouter(orderController, requireAuth) {
    const router = Router()
    router.get('/', requireAuth, withAsyncHandler(orderController.getAllOrders))
    router.post('/', requireAuth, withAsyncHandler(orderController.makeOrder))
    router.patch(
        '/:orderId',
        requireAuth,
        validateCancelOrder,
        withAsyncHandler(orderController.cancelOrder)
    )
    return router
}
