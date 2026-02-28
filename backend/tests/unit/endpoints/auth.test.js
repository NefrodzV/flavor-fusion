import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createApp } from '../../../app.js'
import { createAuthController } from '../../../controllers/auth-controller.js'
import { createAuthRouter } from '../../../routers/auth-router.js'

const createFakeApp = (authService) => {
    const calls = { register: null, login: null, me: null }

    if (!authService) {
        authService = {
            register: ({ name, lastName, email, password }) => {
                calls.register = { name, lastName, email, password }
                return { user: {} }
            },
            login: (email, password) => {
                calls.login = { email, password }
                return { user: {} }
            },
            getCurrentUser: (userId) => {
                calls.me = { userId }
                return { userId }
            },
        }
    }

    const authController = createAuthController(authService)
    const authRouter = createAuthRouter(authController, (req, res, next) => {
        req.user = { id: 5 }
        next()
    })
    const app = createApp({ authRouter })

    return { app, calls }
}

test('/api/auth/register return user and 200', async () => {
    const { app, calls } = createFakeApp()
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'neftaly',
            lastName: 'Rodriguez',
            email: 'neftaly@gmail.com',
            password: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect(201)

    assert.ok(res.body.user)
    assert.deepStrictEqual(calls.register, {
        name: 'neftaly',
        lastName: 'Rodriguez',
        email: 'neftaly@gmail.com',
        password: '12345678',
    })
})
// TODO: MAKE TEST FOR INVALID DATA AND THE PERTAINING MIDDLEWARES
test('/api/auth/register throws error and 400', async () => {
    const { app, calls } = createFakeApp()
    const res = await request(app)
        .post('/api/auth/register')
        .send()
        .expect('Content-Type', /json/)
        .expect(400)

    assert.equal(calls.register, null)
    assert.ok(res.body.errors)
})

test('/api/auth/me return user and 200', async () => {
    const { app, calls } = createFakeApp()
    const res = await request(app)
        .get('/api/auth/me')
        .expect('Content-Type', /json/)
        .expect(200)

    assert.deepStrictEqual(calls.me, { userId: 5 })
    assert.ok(res.body.user)
})

test('/api/auth/login throws errors and 400', async () => {
    const { app, calls } = createFakeApp()
    const res = await request(app)
        .post('/api/auth/login')
        .expect('Content-Type', /json/)
        .expect(400)

    assert.equal(calls.login, null)
    assert.ok(res.body.errors)
})
