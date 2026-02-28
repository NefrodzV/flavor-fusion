import { Router } from 'express'
import { withAsyncHandler } from '../utils'

export function createOrderRouter(orderController, requireAuth) {
    const router = Router()
    router.get('/', requireAuth, withAsyncHandler(orderService.getAllOrders))
    router.post('/', requireAuth, withAsyncHandler(orderService.makeOrder))
    router.patch(
        '/:orderId',
        requireAuth,
        withAsyncHandler(orderController.cancelOrder)
    )
    return router
}
