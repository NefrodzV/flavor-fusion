import app from "./app.js"
import { env } from 'node:process'
import { log } from "./utils/logger.js"
const PORT = env.PORT || 3000
app.listen(PORT, () => {
    log(`Server is listening in http://localhost:${PORT}`)
})