const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY || 'tokenclave');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.json({
            message: 'no tienes permiso'
        });
    }
};
