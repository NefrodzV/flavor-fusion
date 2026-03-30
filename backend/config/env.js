import { loadEnvFile } from 'node:process'
loadEnvFile()
function required(name) {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required envireoment variable: ${name}`)
    }
    return value
}
export const env = {
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: required('JWT_SECRET'),
    databaseUser: required('DATABASE_USER'),
    databasePassword: required('DATABASE_PASSWORD'),
    databaseHost: required('DATABASE_HOST'),
    databaseName: required('DATABASE_NAME'),
    stripeSecret: require('STRIPE_SECRET'),
}
