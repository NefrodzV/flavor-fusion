import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { logError } from './utils/index.js'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function createApp({
    menuRouter = () => {},
    cartRouter = () => {},
    authRouter = () => {},
    orderRouter = () => {},
    stripeWebhookRouter = () => {},
}) {
    const app = express()

    app.use(
        cors({
            origin: 'http://localhost:5173',
            credentials: true,
        })
    )

    app.use('/api/stripe-hooks', stripeWebhookRouter)
    app.use(cookieParser())
    app.use(express.json())
    const menuImagesPath = path.join(__dirname, 'images', 'menu')

    console.log('Serving images from exact folder:', menuImagesPath)
    app.use(
        '/api/images/menu',
        express.static(path.join(__dirname, 'images', 'menu'))
    )

    app.use('/api/menu', menuRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/orders', orderRouter)

    app.use((err, req, res, next) => {
        logError(err)
        const status = err.statusCode || 500
        return res.status(status).json({
            error: {
                message: err.message || 'Internal Server Error',
                errors: err.errors || undefined,
            },
        })
    })
    return app
}
