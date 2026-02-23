import express from 'express'
import { logError } from './utils/index.js'

export function createApp({ menuRouter = () => {}, cartRouter = () => {} }) {
    const app = express()

    app.use(express.json())

    app.use('/api/menu', menuRouter)
    app.use('/api/cart', cartRouter)

    app.use((err, req, res, next) => {
        logError(err)
        return res.status(500).json({
            error: err.message || 'Internal Server Error',
            stack: err.stack,
        })
    })
    return app
}
