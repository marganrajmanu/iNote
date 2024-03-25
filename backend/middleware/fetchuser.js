const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const fetchuser = (req, res, next) => {
    // Get user from jwt token and id to req object
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'No Token Provided' });
    }
    try {
        // Verify the token
        jwt.verify(token, JWT_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

            // Token verification successful
            req.userId = decoded.user.id;
            next();
        });
    } catch (err) {
        return res.status(500).send({ 'error': err });
    }

}

module.exports = fetchuser;
