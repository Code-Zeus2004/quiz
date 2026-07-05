const {
    createUser,
    findUserByEmail
} = require("../models/userModel");

const {
    hashPassword,
    comparePassword
} = require("../utils/password");

const {
    generateToken
} = require("../utils/jwt");

/**
 * Register a new user
 */
async function register(userData) {
    const { username, email, password } = userData;

    // Check if email already exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email is already registered.");
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Save user
    const newUser = await createUser({
        username,
        email,
        password_hash,
        role: "user"
    });

    return newUser;
}

/**
 * Login user
 */
async function login(email, password) {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatches = await comparePassword(
        password,
        user.password_hash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password.");
    }

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };
}

module.exports = {
    register,
    login
};