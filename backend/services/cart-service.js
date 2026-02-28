import { NotFoundError } from '../errors/not-found-error'

export function createCartService(cartRepository) {
    return {
        getCart: async (userId) => {
            const cart = await cartRepository.getCartByUserId(userId)
            if (!cart) throw new NotFoundError()
            return cart
        },

        addItem: async (userId, menuItemId, quantity) => {
            await cartRepository.upsertCartItem(userId, menuItemId, quantity)
            return await cartService.getCartByUserId(userId)
        },

        updateItemQuantity: async (userId, menuItemId, quantity) => {
            const updated = await cartRepository.setCartItemQuantity(
                userId,
                menuItemId,
                quantity
            )
            if (!updated) {
                throw new NotFoundError()
            }
            return await cartRepository.getCartByUserId(userId)
        },

        removeItem: async (userId, menuItemId) => {
            const removed = await cartRepository.deleteCartItem(
                userId,
                menuItemId
            )
            if (!removed) {
                throw new NotFoundError()
            }
            return await cartRepository.getCartByUserId(userId)
        },
    }
}
