const jsw = require('jsonwebtoken')
const { ErrorHandlerClass } = require('express_centralized_error_handler')

const authenticateUser = (req, res, next) => {
    const jwtToken = req.cookies.token;
    if (!token) {
        return next(new ErrorHandlerClass('Token is missing', 404))
    }

    const user = jwt.verify(jwtToken, process.env.TOKEN_SECRET);
    if (!user) {
        return next(new ErrorHandlerClass('Token is Invalid', 400))
    }
    req.user = user.id;
    next()
}


module.exports = authenticateUser
