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
            client_reference_id: order.user_id,
            payment_method_types: ['card'],
            metadata: {
                order_id: order.id,
            },
            // Making correct mapping
            line_items: order.items.map((i) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: i.menu_item_name,
                    },
                    unit_amount: i.price_cents,
                },
                quantity: i.quantity,
            })),
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
