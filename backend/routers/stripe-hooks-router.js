import { Router } from 'express'
import bodyParser from 'body-parser'
import { withAsyncHandler } from '../utils/async-handler.js'
export function createStripeHookRouter(webhookController) {
    const router = Router()

    router.post(
        '/webhook',
        bodyParser.raw({ type: 'application/json' }),
        withAsyncHandler(webhookController.handleStripeEvent)
    )
    return router
}
