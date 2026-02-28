export function createOrderController(orderService) {
    return {
        makeOrder: async (req, res) => {
            const userId = req.user.id
            const orders = await orderService.createOrder(userId)
            return res.status(201).json({ orders })
        },

        cancelOrder: async (req, res) => {
            const userId = req.user.id
            const orderId = req.params?.orderId
            const orders = await orderService.cancelOrder(userId, orderId)
            return res.status(200).json({ orders })
        },

        getAllOrders: async (req, res) => {
            const userId = req.user.id
            const orders = await orderService.getAllOrders(userId)
            return res.status(200).json({ orders })
        },
    }
}
