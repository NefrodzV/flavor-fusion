export function createMenuController({ menuRepository }) {
    return {
        getMenu: async (req, res, next) => {
            const menu = await menuRepository.getAll()
            return res.json({ menu })
        },
    }
}
