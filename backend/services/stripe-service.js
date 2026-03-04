import Stripe from 'stripe'

export function createStripePaymentProvider(SECRET, FRONTEND_DOMAIN) {
    if (!SECRET) {
        throw new Error('Stripe SECRET is undefined')
    }

    if (!FRONTEND_DOMAIN) {
        throw new Error('Stripe FRONTEND_DOMAIN is undefined')
    }

    const stripe = new Stripe(SECRET)

    async function createCheckoutSession(order) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: order.items,
            mode: 'payment',
            currency: 'usd',
            success_url: `${FRONTEND_DOMAIN}/checkout?success=true`,
            cancel_url: `${FRONTEND_DOMAIN}/checkout?success=false`,
        })

        return session.url
    }

    return {
        createCheckoutSession,
    }
}
