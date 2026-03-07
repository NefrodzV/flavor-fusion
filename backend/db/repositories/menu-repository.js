export function createMenuRepository(db) {
    if (!db) {
        throw new Error('db param is undefined')
    }
    return {
        getAll: async () => {
            const { rows } = await db.query(`
                SELECT
                    mi.id,
                    mi.name, 
                    description,
                    price_cents,
                    json_agg(images.obj) as images
                FROM menu_items mi
                LEFT JOIN 
                (
                SELECT
                    mii.menu_item_id,
                    jsonb_build_object(
                    'storage_key',a.storage_key,
                    'width',a.width, 
                    height',a.height, 
                    'name', a.name) as obj
                FROM menu_item_images mii
                LEFT JOIN assets a ON a.id = mii.asset_id GROUP By mii.id, a.storage_key, a.width, a.height, a.name

                ) images ON mi.id = images.menu_item_id
                 GROUP BY mi.id
            `)

            return rows
        },
    }
}
