import app from './app.js'
import { env } from 'node:process'
import { log } from './utils/logger.js'
const PORT = env.PORT || 3000
/** TODO:
 * Need to initialize routers and controllers here
 */
app.listen(PORT, () => {
    log(`Server is listening in http://localhost:${PORT}`)
})
