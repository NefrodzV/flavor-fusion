import { EmailAlreadyExistsError } from '../errors/email-already-exits-error.js'
import { InvalidCredentialsError } from '../errors/incorrect-email-or-password-error.js'
export function createAuthService({
    userRepository,
    tokenService,
    hashService,
}) {
    return {
        register: async ({ name, lastName, email, password }) => {
            const existing = await userRepository.findByEmail(email)
            if (existing) throw new EmailAlreadyExistsError()
            const hashed = hashService.hash(password)
            const user = await userRepository.createUser(
                name,
                lastName,
                email,
                hashed
            )
            const token = tokenService.sign(user.id)
            return { user, token }
        },

        login: async (email, password) => {
            const existing = await userRepository.findByEmail(email)
            if (existing) throw new InvalidCredentialsError()
            if (!(await hashService.compare(existing.password, password)))
                throw new InvalidCredentialsError()
            const token = tokenService.sign(existing.id)
            return { user, token }
        },

        getCurrentUser: async (userId) => {
            const user = await userRepository.findById(userId)
            return user
        },
    }
}
