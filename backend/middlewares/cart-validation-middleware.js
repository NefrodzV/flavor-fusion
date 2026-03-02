import { DataIsInvalidError } from '../errors/data-is-invalid-error.js'
import { isPositiveInt } from '../utils/number.js'

export function validateAddCartItem(req, res, next) {
    const rawMenuItemId = req.body?.menuItemId
    const rawQuantity = req.body?.quantity
    const errors = {}

    if (!rawMenuItemId == null) {
        errors.menuItemId = 'Menu item id is required.'
    }

    if (!rawQuantity == null) {
        errors.quantity = 'Quantity is required.'
    }
    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    const menuItemId = Number(rawMenuItemId)
    const quantity = Number(rawQuantity)

    if (Number.isNaN(menuItemId)) {
        errors.menuItemId = 'Menu item id must be a number.'
    }

    if (Number.isNaN(quantity)) {
        errors.quantity = 'Quantity must be a number'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    if (!isPositiveInt(menuItemId)) {
        errors.menuItemId = 'Menu item id must be a positive integer.'
    }

    if (!isPositiveInt(quantity)) {
        errors.quantity = 'Quantity must be a positive integer.'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    req.body.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}

export function validateUpdateItemQuantity(req, res, next) {
    const rawMenuItemId = req.params.menuItemId
    const rawQuantity = req.body?.quantity
    const errors = {}

    if (rawMenuItemId == null) {
        errors.menuItemId = 'Menu item id is required.'
    }

    if (!rawQuantity == null) {
        errors.quantity = 'Quantity is required.'
    }
    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }
    const menuItemId = Number(req.params.menuItemId)
    const quantity = Number(req.body?.quantity)

    if (Number.isNaN(menuItemId)) {
        errors.menuItemId = 'Menu item id must be a number.'
    }

    if (Number.isNaN(quantity)) {
        errors.quantity = 'Quantity must be a number'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    if (!isPositiveInt(menuItemId)) {
        errors.menuItemId = 'Menu item id must be a positive integer.'
    }

    if (!isPositiveInt(quantity)) {
        errors.quantity = 'Quantity must be a positive integer.'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    req.params.menuItemId = menuItemId
    req.body.quantity = quantity
    next()
}

export function validateDeleteCartItem(req, res, next) {
    const rawMenuItemId = req.params.menuItemId

    const errors = {}

    if (rawMenuItemId == null) {
        errors.menuItemId = 'Menu item id is required.'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    const menuItemId = Number(rawMenuItemId)

    if (Number.isNaN(menuItemId)) {
        errors.menuItemId = 'Menu item id must be a number.'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    if (!isPositiveInt(menuItemId)) {
        errors.menuItemId = 'Invalid menu item id'
    }

    if (Object.keys(errors).length) {
        next(new DataIsInvalidError(undefined, errors))
    }

    req.params.menuItemId = menuItemId
    next()
}
