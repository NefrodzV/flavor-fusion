import { type } from 'node:os'
import { DataIsInvalidError } from '../errors/data-is-invalid-error.js'
import { isString } from '../utils/string.js'

const EMAIL_REGEX =
    /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i

export function validateRegisterUser(req, _res, next) {
    const errors = {}
    const name = req.body?.name
    const lastName = req.body?.lastName
    const email = req.body?.email
    const password = req.body?.password

    if (name == null) {
        errors.name = 'Name is required.'
    } else if (!isString(name)) {
        errors.name = 'Name must be a string type'
    } else if (!name?.trim()) {
        errors.name = 'Name is empty.'
    }

    if (lastName == null) {
        errors.lastName = 'Last name is required.'
    } else if (!isString(lastName)) {
        errors.lastName = 'Last name must be a string type.'
    } else if (!lastName?.trim()) {
        errors.lastName = 'Last name is empty.'
    }

    if (email == null) {
        errors.email = 'Email is required.'
    } else if (!isString(email)) {
        errors.email = 'Email must be a string type.'
    } else if (!email?.trim()) {
        errors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Invalid email address.'
    }

    if (password == null) {
        errors.password = 'Password is required'
    } else if (!isString(password)) {
        errors.password = 'Password must be a string type.'
    } else if (!password?.trim()) {
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
