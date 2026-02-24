import { Router } from 'express'
import {
    validateAddCartItem,
    validateDeleteCartItem,
    validateUpdateItemQuantity,
} from '../middlewares/cart-validation-middleware.js'
import { withAsyncHandler } from '../utils/async-handler.js'
export function createCartRouter({
    cartController,
    authenticateJWT = () => {},
}) {
    const router = Router()

    router.use(authenticateJWT)

    router.get('/', withAsyncHandler(cartController.getCart))

    router.post(
        '/items',
        validateAddCartItem,
        withAsyncHandler(cartController.addItem)
    )

    router.patch(
        '/items/:menuItemId',
        validateUpdateItemQuantity,
        withAsyncHandler(cartController.updateItemQuantity)
    )

    router.delete(
        '/items/:menuItemId',
        validateDeleteCartItem,
        withAsyncHandler(cartController.removeItem)
    )

    return router
}
