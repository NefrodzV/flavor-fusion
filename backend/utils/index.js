export * from './logger.js'

export async function sleep(time) {
    return new Promise(res=> setTimeout(res, time))
}