import { isPositiveInt } from '../utils/number.js'
import { isDefined } from '../utils/validation.js'

export function validateAddCartItem(req, res, next) {
    const menuItemId = Number(req.body?.menuItemId)
    const quantity = Number(req.body?.quantity)
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

    // Normalizing data settign correct type
    req.body.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}

export function validateUpdateItemQuantity(req, res, next) {
    const errors = {}

    const menuItemId = Number(req.params.menuItemId)
    const quantity = Number(req.body?.quantity)

    if (!isPositiveInt(menuItemId)) {
        errors.menuItemId = `Invalid menu item id: ${menuItemId}`
    }

    if (!isPositiveInt(quantity)) {
        errors.quantity = `Invalid quantity : ${quantity}`
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors })
    }

    req.params.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}
