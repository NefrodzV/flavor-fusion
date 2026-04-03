export function createOrderController(orderService) {
    return {
        makeOrder: async (req, res) => {
            const userId = req.user.id
            const stripeOrderUrl = await orderService.placeOrder(userId)
            return res.status(201).json({ url: stripeOrderUrl })
        },

        cancelOrder: async (req, res) => {
            const userId = req.user.id
            const orderId = req.params?.orderId
            const order = await orderService.cancelOrder(userId, orderId)
            return res.status(200).json({ order })
        },

        getAllOrders: async (req, res) => {
            const userId = req.user.id
            const orders = await orderService.getAllOrders(userId)
            return res.status(200).json({ orders })
        },
    }
}
