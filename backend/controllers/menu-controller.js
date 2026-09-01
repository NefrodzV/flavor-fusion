export function createMenuController({ menuService }) {
    return {
        getMenu: async (req, res, next) => {
            const menu = await menuService.getAll()
            return res.json({ menu })
        },

        getMenuItemWithSlug: async (req, res, next) => {
            const slug = req.params.slug
            const menuItem = await menuService.getMenuItemWithSlug(slug)
            return res.json({ menuItem })
        },
    }
}
