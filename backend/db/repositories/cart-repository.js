function createCartRepository(db) {
    if (!db) {
        throw new Error('Database is undefined in cart repository.')
    }
    return {
        getCartByUserId: async (userId) => {
            const { rows } = await db.query(
                `
                SELECT 
                    SUM(ci.line_total) AS total,
                    ARRAY_AGG(ci) AS items
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
        },
        upsertCartItem: async (userId, menuItemId, quantity) => {},
        setCartItemQuantity: async (userId, menuItemId, quantity) => {},
        deleteCartItem: async (userId, menuItemId) => {},
    }
}
fas
