import { isPositiveInt } from '../utils/number.js'

export function validateAddCartItem(req, res, next) {
    const menuItemId = Number(req.body.menuItemId)
    const quantity = Number(req.body.quantity)
    const errors = {}

    if (!isPositiveInt(menuItemId)) {
        errors.menuItemId = 'Invalid menu item id.'
    }

    if (!isPositiveInt(quantity)) {
        errors.quantity = 'Invalid quantity.'
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors })
    }

    // Normalizing data
    req.body.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}
