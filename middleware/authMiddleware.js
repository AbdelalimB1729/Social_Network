const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Access denied');
    }
    else{
        token = token.replace('Bearer ','')
        const verify = jwt.verify(token,"toto")
        if(verify){
            next()
        }else{
            res.status(401).send('token invalid')
        }
    }
};
module.exports = authMiddleware;