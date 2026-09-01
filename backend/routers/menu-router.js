import { Router } from 'express'
import { withAsyncHandler } from '../utils/index.js'
import { validateMenuItemSlug } from '../middlewares/menu-validation-middleware.js'

export const createMenuRouter = ({ menuController }) => {
    const router = Router()

    router.get('/', withAsyncHandler(menuController.getMenu))
    router.get(
        '/:slug',
        validateMenuItemSlug,
        withAsyncHandler(menuController.getMenuItemWithSlug)
    )
    return router
}
