import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createMenuController } from '../../../controllers/index.js'
import { createMenuRouter } from '../../../routers/index.js'
import { createApp } from '../../../app.js'

const menuController = createMenuController({
    menuService: {
        getAll: async () => [{ id: 1, name: 'menu-item-1' }],
    },
})
const menuRouter = createMenuRouter({ menuController })
const app = createApp({ menuRouter })

test('GET /api/menu returns an array', async () => {
    const res = await request(app).get('/api/menu')
    console.log(res.body)
    assert.ok(Array.isArray(res.body.menu))
})

test('GET /api/menu returns status 200', async () => {
    const res = await request(app).get('/api/menu')
    assert.equal(res.statusCode, 200)
})

test('GET /api/menu returns menu object', async () => {
    const res = await request(app).get('/api/menu')
    assert.ok(res.body.menu)
})

test('GET /api/menu response type is json', async () => {
    await request(app).get('/api/menu').expect('Content-Type', /json/)
})

test('GET /api/menu returns status 500', async () => {
    const menuController = createMenuController({
        menuService: {
            getAll: async () => {
                throw new Error('Failed error test')
            },
        },
    })
    const menuRouter = createMenuRouter({ menuController })
    const app = createApp({ menuRouter })
    await request(app).get('/api/menu').expect(500)
})

test('GET /api/menu/:slug returns 200', async () => {
    const menuController = createMenuController({
        menuService: {
            getMenuItemWithSlug: async (slug) => {
                return {}
            },
        },
    })

    const menuRouter = createMenuRouter({ menuController })
    const app = createApp({ menuRouter })
    await request(app).get('/api/menu/slug').expect(200)
})
