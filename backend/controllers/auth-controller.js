import path from 'node:path'
import { env } from 'node:process'

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
}

export function createAuthController(authService) {
    return {
        register: async (req, res) => {
            const { name, lastName, email, password } = req.body

            const result = await authService.register({
                name,
                lastName,
                email,
                password,
            })

            // If the result was successful set cookie and respond
            res.cookie('flavor_fusion_session', result.token, COOKIE_OPTIONS)

            return res.status(201).json({
                message: `Registration successful`,
            })
        },

        login: async (req, res) => {
            const { email, password } = req.body
            const { user, token } = await authService.login(email, password)

            res.cookie('flavor_fusion_session', token, COOKIE_OPTIONS)

            return res.json({
                message: `Welcome ${user.name} ${user.lastName}`,
                user,
            })
        },

        logout: (req, res) => {
            res.clearCookie('flavor_fusion_session', COOKIE_OPTIONS)
            return res.json({ message: 'You have logged out.' })
        },
    }
}
