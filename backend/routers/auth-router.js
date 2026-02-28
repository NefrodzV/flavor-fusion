import { Router } from 'express'
import { withAsyncHandler } from '../utils/index.js'

export function createAuthRouter(authController, requireAuth) {
    const router = Router()

    router.post('/register', withAsyncHandler(authController.register))
    router.post('/login', withAsyncHandler(authController.login))
    router.get('/me', requireAuth, withAsyncHandler(authController.getMe))

    return router
}
