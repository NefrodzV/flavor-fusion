export function createOrderService(orderRepository) {
    return {
        createOrder: async (userId) => {},
        cancelOrder: async (orderId) => {},
        getAllOrders: async (userId) => {
            return (await orderRepository.getAll()) || []
        },
    }
}
