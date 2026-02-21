import { Pool } from 'pg'
import { env } from 'node:process'
import { logError } from '../utils/index.js'

export const pool = new Pool({
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    host: env.DATABASE_LOCALHOST,
    database: env.DATABASE_NAME
})

export async function withTransaction(cb) {
    const client = await pool.connect()
    try {
        await client.query(`BEGIN`)
        const res = await cb(client)
        await client.query('COMMIT')
        return res
    } catch(err) {
        await client.query('ROLLBACK')
        logError(`Transaction error`, err)
        throw err
    } finally { 
        client.release()
    }
}
