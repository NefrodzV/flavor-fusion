import request from 'supertest'
import test from 'node:test'
import assert from 'node:assert'
import { createApp } from '../../app.js'
import { createMenuRepository } from '../../db/repositories/menu-repository.js'
import { createMenuController } from '../../controllers/menu-controller.js'
import { createMenuRouter } from '../../routers/menu-router.js'
import { pool } from '../../db/pool.js'
import { createMenuService } from '../../services/menu-service.js'

let client
let menuRepository
let menuController
let menuService
let menuRouter
let app

test.before(async () => {
    client = await pool.connect()
    menuRepository = createMenuRepository(client)
    menuService = createMenuService(menuRepository)
    menuController = createMenuController({ menuService })
    menuRouter = createMenuRouter({ menuController })
    app = createApp({ menuRouter })
})

test.after(async () => {
    client.release()
    await pool.end()
})

test('Gets all menu items', async () => {
    const res = await request(app).get('/api/menu').expect(200)
    assert.ok(res.body.menu)
    assert.ok(Array.isArray(res.body.menu))
})

test('Get menu item with slug', async () => {
    const res = await request(app)
        .get('/api/menu/chicken-rice-fusion-bowl')
        .expect(200)
    console.log(res)
    assert.ok(res.body)
})
