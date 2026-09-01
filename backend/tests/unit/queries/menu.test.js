import test from 'node:test'
import assert from 'node:assert'

import { createMenuRepository } from '../../../db/repositories/menu-repository.js'
import { pool } from '../../../db/pool.js'
test.after(async () => await pool.end())
test('getAll returns array of menu items', async () => {
    const menuRepository = createMenuRepository(pool)
    const res = await menuRepository.getAll()
    assert.ok(Array.isArray(res))
})

test('Get a menu Item with a slug', async () => {
    const menuRepository = createMenuRepository(pool)
    const res = await menuRepository.getMenuItemWithSlug(
        'chicken-rice-fusion-bowl'
    )

    assert.ok(res)
})
