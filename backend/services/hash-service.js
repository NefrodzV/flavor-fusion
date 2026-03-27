import bcrypt from 'bcryptjs'

export async function hash(password, salt = 10) {
    return await bcrypt.hash(password, salt)
}

export async function compare(password, hash) {
    return await bcrypt.compare(password, hash)
}
