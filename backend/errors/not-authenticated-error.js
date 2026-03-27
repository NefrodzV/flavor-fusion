export class NotAuthenticatedError extends Error {
    constructor(message = 'You must sign in again.') {
        super(message)
        this.name = 'NotAuthenticatedError'
        this.statusCode = 401
    }
}
