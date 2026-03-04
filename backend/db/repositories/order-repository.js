export function createOrderRepository(db) {
    if (!db) {
        throw new Error('Order repository db is undefined.')
    }
    return {
        createOrder: async (userId) => {
            const { rows } = await db.query(
                `INSERT INTO orders (user_id) VALUES ($1)`,
                [userId]
            )
            return rows[0]
        },

        createOrderItem: async (orderId, menuItemId, quantity, priceCents) => {
            const { rows } = await db.query(
                `
                INSERT INTO order_items (order_id, menu_item_id, quantity, price_cents) VALUES ($1, $2, $3, $4)
                `,
                [orderId, menuItemId, quantity, priceCents]
            )

            return rows
        },
    }
}
