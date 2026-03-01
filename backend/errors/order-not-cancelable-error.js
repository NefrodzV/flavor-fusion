export class OrderNotCancelableError extends Error {
    constructor(message = 'Order not cancelable') {
        super(message)
        this.statusCode = 409
        this.name = 'OrderNotCancelableError'
    }
}
