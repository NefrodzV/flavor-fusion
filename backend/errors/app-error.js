export class AppError extends Error {
    constructor(message = 'A error has ocurred', statusCode = 500) {
        super(message)
        this.name = 'AppError'
        this.statusCode = statusCode
    }
}
