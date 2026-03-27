import { env } from '../config/env.js'
import { NotAuthenticatedError } from '../errors/not-authenticated-error.js'
import * as tokenService from '../services/token-service.js'

export async function validateAuthToken(req, _res, next) {
    const authToken = req.cookies.flavor_fusion_session
    const payload = await tokenService.verify(authToken, env.jwtSecret)
    if (!payload) {
        next(new NotAuthenticatedError())
    }
    req.user = { id: payload.userId }
    next()
}
