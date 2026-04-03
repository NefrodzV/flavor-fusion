import { env } from '../config/env.js'
import Stripe from 'stripe'
const stripe = new Stripe(env.stripeSecret)
export function createWebhookController(orderService) {
    return {
        handleStripeEvent: async (req, res) => {
            console.log('test is running')
            console.log(req.body)
            const payload = req.body
            const sig = req.headers['stripe-signature']

            const event = stripe.webhooks.constructEvent(
                payload,
                sig,
                env.endpointSecret
            )

            await orderService.fulfillOrder(event)

            return res.sendStatus(200)
        },
    }
}
