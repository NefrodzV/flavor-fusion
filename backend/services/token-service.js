import * as jose from 'jose'
import { env, loadEnvFile } from 'node:process'
loadEnvFile()

export async function sign(payload, secret) {
    const encoder = new TextEncoder()
    const keyBytes = encoder.encode(secret)
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(keyBytes)
}

export async function verify(jwt, secret) {
    const encoder = new TextEncoder()
    const keyBytes = encoder.encode(secret)
    const { payload } = await jose.jwtVerify(jwt, keyBytes)
    return payload
}
