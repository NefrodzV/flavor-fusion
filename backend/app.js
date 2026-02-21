import express from 'express'
import { menuRouter } from './routers/index.js'
import {pool} from './db/pool.js'
const app = express()

// Must change this port to the env version
const PORT = 3000

app.use('/menu', menuRouter)
app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is listening in http://localhost:${PORT}`)
})