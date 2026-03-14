import test from 'node:test'
import assert from 'node:assert'

import { createMenuRepository } from '../../../db/repositories/menu-repository.js'
import { pool } from '../../../db/pool.js'

test('getAll returns array of menu items', async () => {
    const menuRepository = createMenuRepository(pool)
    const res = await menuRepository.getAll()
    assert.ok(Array.isArray(res))
    await pool.end()
})
