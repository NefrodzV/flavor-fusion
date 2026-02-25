import { EmailAlreadyExistsError } from '../errors/email-already-exits-error'

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
    }
}
