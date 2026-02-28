import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { logError } from './utils/index.js'

export function createApp({
    menuRouter = () => {},
    cartRouter = () => {},
    authRouter = () => {},
}) {
    const app = express()

    app.use(
        cors({
            origin: 'http://localhost:5273',
            credentials: true,
        })
    )
    app.use(cookieParser())
    app.use(express.json())

    app.use('/api/menu', menuRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/auth', authRouter)

    app.use((err, req, res, next) => {
        logError(err)
        const status = err.statusCode || 500
        return res.status(status).json({
            error: err.message || 'Internal Server Error',
            stack: err.stack,
            errors: err.errors,
        })
    })
    return app
}
