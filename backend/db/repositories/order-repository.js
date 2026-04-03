export function createOrderRepository(db) {
    if (!db) {
        throw new Error('Order repository db is undefined.')
    }
    return {
        createOrder: async (userId) => {
            const { rows } = await db.query(
                `INSERT INTO orders (user_id) VALUES ($1) RETURNING id, user_id`,
                [userId]
            )
            return rows[0]
        },

        createOrderItem: async (orderId, menuItemId, quantity, priceCents) => {
            const { rows } = await db.query(
                `
                WITH inserted_item AS(
                INSERT INTO order_items (order_id, menu_item_id, quantity, price_cents) VALUES ($1, $2, $3, $4)
                RETURNING *)
                
                SELECT 
                i.*,
                m.name as menu_item_name
                FROM inserted_item i 
                JOIN menu_items m ON i.menu_item_id=m.id`,
                [orderId, menuItemId, quantity, priceCents]
            )

            return rows[0]
        },
        updateOrderStatus: async (orderId, userId, paymentStatus) => {
            const { rows, rowCount } = await db.query(
                `
                UPDATE orders 
                SET payment_status=$3
                WHERE user_id=$1 AND id=$2`,
                [userId, orderId, paymentStatus]
            )

            return rowCount
        },
    }
}
