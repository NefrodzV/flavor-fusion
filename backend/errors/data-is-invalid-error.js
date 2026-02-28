export class DataIsInvalidError extends Error {
    constructor(message = 'There are invalid fields please fix them.', errors) {
        super(message)
        this.name = 'InvalidDataError'
        this.statusCode = 400
        this.errors = errors
    }
}
