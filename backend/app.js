import express from 'express'
import { logError } from './utils/index.js'

export function createApp({ menuRouter }) {
    const app = express()

    app.use('/api/menu', menuRouter)

    app.use((err, req, res, next) => {
        logError(err)
        return res.status(500).json({ error: 'Internal Server Error' })
    })
    return app
}
