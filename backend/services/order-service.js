import { NotFoundError } from '../errors/not-found-error'
import { OrderNotCancelableError } from '../errors/order-not-cancelable-error.js'

export function createOrderService(orderRepository) {
    return {
        createOrder: async (userId) => {},
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
            return { orders: [] }
        },
    }
}
