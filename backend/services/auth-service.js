import { EmailAlreadyExistsError } from '../errors/email-already-exits-error.js'
import { InvalidCredentialsError } from '../errors/incorrect-email-or-password-error.js'
import { env } from '../config/env.js'
export function createAuthService({
    userRepository,
    tokenService,
    hashService,
    cartService,
}) {
    return {
        register: async ({ name, lastName, email, password }) => {
            const existing = await userRepository.findByEmail(email)
            if (existing) throw new EmailAlreadyExistsError()
            const hashed = await hashService.hash(password)
            const user = await userRepository.createUser(
                name,
                lastName,
                email,
                hashed
            )

            await cartService.createCart(user.id)

            const token = await tokenService.sign(
                { userId: user.id },
                env.jwtSecret
            )
            return { user, token }
        },

        login: async (email, password) => {
            const existing = await userRepository.findByEmail(email)
            if (!existing) throw new InvalidCredentialsError()
            if (!(await hashService.compare(password, existing.password)))
                throw new InvalidCredentialsError()
            const token = await tokenService.sign(
                { userId: existing.id },
                env.jwtSecret
            )
            return { user: existing, token }
        },

        getCurrentUser: async (userId) => {
            const user = await userRepository.findById(userId)
            return user
        },
    }
}
