const jwt = require('jsonwebtoken');

async function generateToken(user) {
    const token = await jwt.sign({ id: user._id, iat: Math.floor(Date.now() / 1000) - 30 }, process.env.TOKEN_SECRET, { expiresIn: '24h' })
    return token;
}

module.exports = generateToken;