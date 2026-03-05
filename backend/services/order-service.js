import { NotFoundError } from '../errors/not-found-error.js'
import { OrderNotCancelableError } from '../errors/order-not-cancelable-error.js'
export function createOrderService({
    db,
    withTransaction,
    createOrderRepository,
    createCartRepository,
    stripeService,
}) {
    return {
        // TODO: CREATE REPOS WITH FACTORY FUNCTIONS
        placeOrder: async (userId) => {
            const res = await withTransaction(db, async (client) => {
                const cartRepository = createCartRepository(client)
                const orderRepository = createOrderRepository(client)

                const cartItems = await cartRepository.getCartItems(userId)
                const order = await orderRepository.createOrder(userId)

                const orderItems = []

                for (const item of cartItems) {
                    const orderItem = await orderRepository.createOrderItem(
                        order.id,
                        item.menuItemId,
                        item.quantity,
                        item.priceCents
                    )
                    orderItems.push(orderItem)
                }

                return { order: { ...order, items: orderItems } }
            })

            // After order and order items have been created
            const sessionUrl = await stripeService.createCheckoutSession(res)
            return sessionUrl
        },
        cancelOrder: async (orderId) => {
            const order = await orderRepository.getById(orderId)
            if (!order) {
                throw new NotFoundError('Order not found')
            }

            if (!['paid', 'preparing'].includes(order.status)) {
                throw new OrderNotCancelableError()
            }

            return await orderRepository.updateStatus(orderId, 'cancelled')
        },
        getAllOrders: async (userId) => {
            const orders = (await orderRepository.getAllByUserId(userId)) || []
            return { orders }
        },
    }
}
