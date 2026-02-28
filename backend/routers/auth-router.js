import { Router } from 'express'
import { withAsyncHandler } from '../utils/index.js'
import {
    validateLoginUser,
    validateRegisterUser,
} from '../middlewares/auth-validation-middleware.js'

export function createAuthRouter(authController, requireAuth) {
    const router = Router()

    router.post(
        '/register',
        validateRegisterUser,
        withAsyncHandler(authController.register)
    )
    router.post(
        '/login',
        validateLoginUser,
        withAsyncHandler(authController.login)
    )
    router.get('/me', requireAuth, withAsyncHandler(authController.getMe))

    return router
}
