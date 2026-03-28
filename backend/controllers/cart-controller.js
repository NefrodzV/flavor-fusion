export function createCartController(cartService) {
    console.log(cartService)
    return {
        getCart: async (req, res) => {
            const userId = req.user.id
            const cart = await cartService.getCart(userId)
            return res.status(200).json({ cart })
        },

        addItem: async (req, res) => {
            const { id: userId } = req.user
            const { menuItemId, quantity } = req.body
            const cart = await cartService.addItem(userId, menuItemId, quantity)
            return res.status(200).json({ cart })
        },

        updateItemQuantity: async (req, res) => {
            const { id: userId } = req.user
            const menuItemId = req.params?.menuItemId
            const { quantity } = req.body
            const cart = await cartService.updateItemQuantity(
                userId,
                menuItemId,
                quantity
            )
            return res.status(200).json({ cart })
        },

        removeItem: async (req, res) => {
            const userId = req.user.id
            const menuItemId = req.params?.menuItemId
            const cart = await cartService.removeItem(userId, menuItemId)
            return res.status(200).json({ cart })
        },
    }
}
