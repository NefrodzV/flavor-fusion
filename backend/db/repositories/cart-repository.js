export function createCartRepository(db) {
    if (!db) {
        throw new Error('Database is undefined in cart repository.')
    }
    return {
        createCart: async (userId) => {
            const { rows } = await db.query(
                `INSERT INTO carts
                (user_id) VALUES ($1)`,
                [userId]
            )

            return rows[0]
        },
        getCartByUserId: async (userId) => {
            const { rows } = await db.query(
                `
                SELECT 
                    COALESCE(SUM(ci.line_total), 0) AS total,
                    COALESCE(json_agg(ci) FILTER(WHERE ci IS NOT NULL),'[]'::json) AS items
                    from carts c 
                    LEFT JOIN (
                        SELECT 
                            ci.cart_id,
                            mi.id AS menu_item_id,
                            ci.quantity,
                            mi.name,
                            mi.price_cents,
                            (quantity * price_cents) AS line_total,
                            json_agg(imgs.obj) AS images
                        FROM cart_items ci
                        LEFT JOIN menu_items mi ON mi.id = ci.menu_item_id
                        LEFT JOIN (
                            SELECT 
                                mii.menu_item_id,
                                json_build_object(
                                    'name', a.name,
                                    'storage_key', a.storage_key,
                                    'height', a.height,
                                    'width', a.width,
                                    'mime_type', a.mime_type
                                ) obj
                            FROM menu_item_images mii
                            LEFT JOIN assets a ON a.id = mii.asset_id
                        ) imgs ON imgs.menu_item_id = mi.id
                        GROUP BY mi.id, ci.quantity, mi.name, mi.price_cents, ci.cart_id
                    ) ci ON ci.cart_id = c.id
                    WHERE c.user_id=$1
                `,
                [userId]
            )
            return rows[0] || null
        },
        upsertCartItem: async (userId, menuItemId, quantity) => {
            const { rows } = await db.query(
                `
                    INSERT INTO cart_items as ci (
                        cart_id,
                        menu_item_id,
                        quantity
                        )
                    VALUES ((SELECT id FROM carts WHERE user_id=$1), $2, $3) ON CONFLICT (cart_id,menu_item_id) DO UPDATE SET quantity=ci.quantity + EXCLUDED.quantity
                    RETURNING *
                `,
                [userId, menuItemId, quantity]
            )

            return rows[0] || null
        },
        setCartItemQuantity: async (userId, menuItemId, quantity) => {
            const { rows } = await db.query(
                `
                UPDATE cart_items 
                SET quantity=$1 
                WHERE menu_item_id=$2 AND cart_id=(
                SELECT id FROM carts
                WHERE user_id=$3
                ) RETURNING menu_item_id, quantity`,
                [quantity, menuItemId, userId]
            )
            return rows[0] || null
        },
        deleteCartItem: async (userId, menuItemId) => {
            const { rows, rowCount } = await db.query(
                `
                DELETE FROM cart_items WHERE menu_item_id=$1 AND cart_id = (
                    SELECT id FROM carts WHERE user_id=$2
                ) RETURNING *`,
                [menuItemId, userId]
            )

            return rowCount
        },
    }
}
