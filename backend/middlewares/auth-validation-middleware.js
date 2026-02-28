import { DataIsInvalidError } from '../errors/data-is-invalid-error.js'

const EMAIL_REGEX =
    /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i

export function validateRegisterUser(req, _res, next) {
    const errors = {}
    const name = req.body?.name
    const lastName = req.body?.lastName
    const email = req.body?.email
    const password = req.body?.password

    if (!name?.trim()) {
        errors.name = 'Name is required.'
    }

    if (!lastName?.trim()) {
        errors.lastName = 'Last name is required.'
    }

    if (!email?.trim()) {
        errors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Invalid email address.'
    }

    if (!password?.trim()) {
        errors.password = 'Password is required.'
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.'
    }

    if (Object.keys(errors).length) {
        return next(new DataIsInvalidError(undefined, errors))
    }

    next()
}

export function validateLoginUser(req, _res, next) {
    const email = req.body?.email
    const password = req.body?.password
    const errors = {}
    if (!email?.trim()) {
        errors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Invalid email address.'
    }

    if (!password?.trim()) {
        errors.password = 'Password is required.'
    }

    if (Object.keys(errors).length) {
        return next(new DataIsInvalidError(undefined, errors))
    }
    next()
}
