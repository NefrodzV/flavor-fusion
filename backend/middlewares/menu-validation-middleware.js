import { DataIsInvalidError } from '../errors/data-is-invalid-error.js'

export function validateMenuItemSlug(req, _res, next) {
    const slug = req.params.slug

    if (typeof slug !== 'string' || !slug.trim()) {
        throw new DataIsInvalidError('Invalid or missing slug parameter')
    }

    next()
}
