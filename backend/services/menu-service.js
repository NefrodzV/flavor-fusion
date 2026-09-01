import { NotFoundError } from '../errors/not-found-error.js'

export function createMenuService(menuRepository) {
    return {
        getAll: async () => {
            const menu = await menuRepository.getAll()
            if (!menu) throw new NotFoundError()
            return menu
        },

        getMenuItemWithSlug: async (slug) => {
            const menuItem = await menuRepository.getMenuItemWithSlug(slug)
            if (!menuItem) throw new NotFoundError('Menu Item not found')
            return menuItem
        },
    }
}
