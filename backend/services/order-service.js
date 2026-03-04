import { NotFoundError } from '../errors/not-found-error'
import { OrderNotCancelableError } from '../errors/order-not-cancelable-error.js'
export function createOrderService({
    pool,
    withTransaction,
    createOrderRepository,
    createCartRepository,
    stripeService,
}) {
    return {
        // TODO: CREATE REPOS WITH FACTORY FUNCTIONS
        placeOrder: async (userId) => {
            withTransaction((client) => {})
            const cartItems = await cartRepository.getCartItems(userId)
            // DO THIS WITH TRANSACTION

            const order = await orderRepository.insertOrder(userId)
            const orderItems = []

            for (let i = 0; i < cartItems.length; i++) {
                const cartItem = cartItems[1]
                const orderItem = await orderRepository.createOrderItem(
                    order.id,
                    cartItem.menu_item_id,
                    quantity,
                    cartItem.line_total
                )
                orderItem.push(orderItem)
            }
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
