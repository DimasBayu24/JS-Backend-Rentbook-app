const jwt  = require('jsonwebtoken');
const response = require('./response');
const allowedAccess = process.env.REQUEST_HEADERS

module.exports = {
    authInfo : (req,res,next)=>{
        console.log('masuk')
        const headerAuth = req.headers["authorization"]
        const headerSecret = req.headers['x-token']
        if ( headerAuth !==  allowedAccess){
            return response.response(res,null,401,"Sorry You Unauthorized")
        } else if (typeof headerSecret === 'undefined'){
            next()
        }
        else {
            const barerToken = headerSecret.split(' ')
            req.token = barerToken[1]
            next()
        }
    },
    accessToken : (req,res,next) =>{
        const secretKey = process.env.SECRET_KEY
        const accessToken = req.token
        const userToken = req.headers['user-token']
        jwt.verify (accessToken,secretKey, (err, decode) =>{
            if(err && err.name === 'TokenExpiredError') return response.response(res,null,402,'Token Expired')

            if(err && err.name === 'JsonWebTokenError') return response.response(res,null,402,'Invalid Token')

            if(parseInt(userToken) !== parseInt(decode.id_user))return response.response(res,null,402,'Invalid User Token')

            next()
        })
    }
}