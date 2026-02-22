export function createCartController({ cartRepository }) {
    return {
        getCart: async (req, res) => {
            const userId = req.user.id
            const cart = await cartRepository.getCartByUserId(userId)
            return res.status(200).json({ cart })
        },

        addItem: async (req, res) => {
            const userId = req.user.id
            const menuItemId = req.body.menuItemId
            const quantity = req.body.quantity
            const created = await cartRepository.upsertCartItem(
                userId,
                menuItemId,
                quantity
            )
            const cart = await cartRepository.getCartByUserId(userId)
            const status = created ? 201 : 200
            return res.status(status).json({ cart })
        },

        updateItemQuantity: async (req, res) => {
            const userId = req.user.id
            const menuItemId = req.params.menuItemId
            const quantity = req.body.quantity
            const updated = await cartRepository.setCartItemQuantity(
                userId,
                menuItemId,
                quantity
            )
            if (!updated) {
                return res.status(404).json({ error: 'Not found' })
            }
            const cart = await cartRepository.getCartByUserId(id)
            return res.status(200).json({ cart })
        },

        deleteItem: async (req, res) => {
            const userId = req.user.id
            const menuItemId = req.params.menuItemId
            const removed = await cartRepository.removeCartItem(
                userId,
                menuItemId
            )
            if (!removed) {
                return res.status(404).json({ error: 'Not found' })
            }
            const cart = await cartRepository.getCartByUserId(id)
            return res.status(200).json({ cart })
        },
    }
}
