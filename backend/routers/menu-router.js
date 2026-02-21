import { Router } from 'express'
import { withAsyncHandler } from '../utils/index.js'

export const createMenuRouter = ({ menuController }) => {
    const router = Router()

    router.get('/', withAsyncHandler(menuController.getMenu))

    return router
}
