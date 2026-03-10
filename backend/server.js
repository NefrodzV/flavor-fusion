import { createApp } from './app.js'
import { log } from './utils/logger.js'
import { env } from './config/env.js'
const app = createApp()
app.listen(env.port, () => {
    log(`Server is listening in http://localhost:${env.port}`)
})
