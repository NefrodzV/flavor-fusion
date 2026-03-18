export function createUserRepository(db) {
    if (!db) {
        throw new Error('db param must be defined')
    }
    return {
        findUserByEmail: async (email) => {
            const { rows } = await db.query(
                ` SELECT * FROM users WHERE email=$1`,
                [email]
            )

            return rows[0]
        },
        createUser: async (name, lastname, email, hash) => {
            const { rows } = await db.query(
                'INSERT INTO users (name, last_name,email, password) VALUES ($1,$2,$3,$4) RETURNING id',
                [name, lastname, email, hash]
            )
            return rows[0]
        },

        findById: async (userId) => {
            const { rows } = await db.query(`SELECT * FROM users WHERE id=$1`, [
                userId,
            ])
            return rows[0]
        },
    }
}
