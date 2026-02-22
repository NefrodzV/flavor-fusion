import { env } from 'node:process'
export function log(text) {
    if (env.NODE_ENV === 'test') return
    console.log(text)
}

export function logError(text) {
    if (env.NODE_ENV === 'test') return
    console.error(text)
}
