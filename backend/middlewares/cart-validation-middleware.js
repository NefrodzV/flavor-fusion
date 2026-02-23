import { isPositiveInt } from '../utils/number.js'
import { isDefined } from '../utils/validation.js'

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

    // Normalizing data settign correct type
    req.body.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}

export function validateUpdateItemQuantity(req, res, next) {
    const errors = {}
    let bodyIsUndefined = false
    let hasUndefinedValues = false
    if (!isDefined(req.body)) {
        bodyIsUndefined = true
        errors.body = 'Request body is null or undefined'
    }
    if (bodyIsUndefined) return res.status(400).json({ errors })
    if (!isDefined(req.body.quantity)) {
        hasUndefinedValues = true
        errors.quantity = 'Quantity is null or undefined'
    }

    if (!isDefined(req.params.menuItemId)) {
        hasUndefinedValues = true
        errors.menuItemId = 'Menu item id is null or undefined'
    }

    if (hasUndefinedValues) return res.status(400).json({ errors })

    const menuItemId = Number(req.params.menuItemId)
    const quantity = Number(req.body.quantity)

    if (!isPositiveInt(menuItemId)) {
        errors.menuItemId = 'Invalid menu item id.'
    }

    if (!isPositiveInt(quantity)) {
        errors.quantity = 'Invalid quantity.'
    }

    if (Object.keys(errors).length) {
        return res.status(400).json({ errors })
    }

    req.params.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}
