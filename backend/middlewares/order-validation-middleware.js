import { DataIsInvalidError } from '../errors/data-is-invalid-error.js'
import { isPositiveInt } from '../utils/number.js'

export function validateCancelOrder(req, _res, next) {
    const rawOrderId = req.params?.orderId
    if (!rawOrderId) {
        return next(
            new DataIsInvalidError(undefined, {
                orderId: 'Param order id is required.',
            })
        )
    }

    const orderId = Number(rawOrderId)
    if (Number.isNaN(orderId)) {
        return next(
            new DataIsInvalidError(undefined, {
                orderId: 'Param order id is not a number.',
            })
        )
    }

    if (!isPositiveInt(orderId)) {
        return next(
            new DataIsInvalidError(undefined, {
                orderId: 'Param order id must be a positive number.',
            })
        )
    }
    req.params.orderId = orderId
    next()
}
