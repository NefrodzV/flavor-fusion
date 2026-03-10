import { Pool } from 'pg'
import { logError, sleep } from '../utils/index.js'
import { env } from '../config/env.js'
export const pool = new Pool({
    user: env.databaseUser,
    password: env.databasePassword,
    host: env.databaseHost,
    database: env.databaseName,
})

export async function withTransaction(db, cb) {
    const client = await db.connect()
    try {
        await client.query(`BEGIN`)
        const res = await cb(client)
        await client.query('COMMIT')
        return res
    } catch (err) {
        await client.query('ROLLBACK')
        logError(`Transaction error`, err)
        throw err
    } finally {
        client.release()
    }
}

export async function queryWithRetries(queryCb, retries = 4) {
    const waitTimes = [0, 500, 1000, 2000, 4000]
    if (retries > waitTimes.length) {
        throw new Error(`You can only retry ${waitTimes.length} max.`)
    }

    for (let retry = 0; retry < retries; retry++) {
        try {
            if (waitTimes[retry]) {
                await sleep(waitTimes[retry])
            }
            return await queryCb()
        } catch (err) {
            logError('Query with retries error', {
                code: err.code,
                message: err.message,
                name: err.message,
            })
            const pgErrors = new Set([
                'ECONNREFUSED',
                'ETIMEDOUT',
                'ECONNRESET',
                '57P03',
            ])
            if (!pgErrors.has(err.code)) throw e
        }
    }
}
