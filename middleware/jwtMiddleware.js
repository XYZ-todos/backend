const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


function auth(req, res, next) {
    const bearertoken = req.header('Authorization')
    const token = bearertoken.split(' ')[1];

    console.log(bearertoken )
    //Check for token 
    if (!token) return res.status(401).json({ 'success': false, 'msg': 'No token authorization' })

    try {
        //varify token 
        const decoded = jwt.verify(token, jwtSecret)

        //Add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ 'success': false, msg: 'Token is not valid' })
    }
}

module.exports = auth;