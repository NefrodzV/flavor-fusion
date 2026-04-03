import { AppError } from '../errors/app-error.js'
import { NotFoundError } from '../errors/not-found-error.js'
import { OrderNotCancelableError } from '../errors/order-not-cancelable-error.js'
export function createOrderService({
    db,
    withTransaction,
    createOrderRepository,
    createCartRepository,
    stripeService,
    existingClient,
}) {
    async function executePlaceOrderLogic(client, userId) {
        const cartRepository = createCartRepository(client)
        const orderRepository = createOrderRepository(client)

        const cart = await cartRepository.getCartByUserId(userId)
        const cartItems = cart.items
        if (!cartItems || cartItems.length === 0) {
            throw new AppError('Cart is empty', 400)
        }
        const order = await orderRepository.createOrder(userId)

        const orderItems = []

        for (const item of cartItems) {
            const orderItem = await orderRepository.createOrderItem(
                order.id,
                item.menu_item_id,
                item.quantity,
                item.price_cents
            )
            orderItems.push(orderItem)
        }

        return { ...order, items: orderItems }
    }
    return {
        // TODO: CREATE REPOS WITH FACTORY FUNCTIONS
        placeOrder: async (userId) => {
            let res
            if (existingClient) {
                res = await executePlaceOrderLogic(existingClient, userId)
            } else {
                res = await withTransaction(db, async (client) => {
                    return await executePlaceOrderLogic(client)
                })
            }

            // After order and order items have been created
            const sessionUrl = await stripeService.createCheckoutSession(res)
            return sessionUrl
        },
        cancelOrder: async (orderId) => {
            const orderRepository = createOrderRepository(db)
            const order = await orderRepository.getOrderById(orderId)
            if (!order) {
                throw new NotFoundError('Order not found')
            }

            if (!['paid', 'preparing'].includes(order.status)) {
                throw new OrderNotCancelableError()
            }

            return await orderRepository.updateStatus(orderId, 'cancelled')
        },
        getAllOrders: async (userId) => {
            const orderRepository = createOrderRepository(db)
            const orders =
                (await orderRepository.getOrdersByUserId(userId)) || []
            return { orders }
        },

        fulfillOrder: async (event) => {
            if (
                event.type === 'checkout.session.completed' ||
                event.type === 'checkout.session.async_payment_succeeded'
            ) {
                const orderRepository = createOrderRepository(db)
                const userId = event.data.object.client_reference_id
                const orderId = event.data.object.metadata.order_id
                const res = await orderRepository.updateOrderStatus(
                    userId,
                    orderId,
                    'paid'
                )
            }
        },
    }
}
