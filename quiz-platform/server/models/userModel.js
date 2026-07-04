const pool = require("../config/db");

/**
 * Find a user by email
 */
async function findUserByEmail(email) {
    const query = `
        SELECT *
        FROM users
        WHERE email = $1
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
}

/**
 * Find a user by ID
 */
async function findUserById(id) {
    const query = `
        SELECT *
        FROM users
        WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

/**
 * Create a new user
 */
async function createUser(user) {
    const query = `
        INSERT INTO users
        (
            username,
            email,
            password_hash,
            role
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING
            id,
            username,
            email,
            role,
            created_at
    `;

    const values = [
        user.username,
        user.email,
        user.password_hash,
        user.role || "user"
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};