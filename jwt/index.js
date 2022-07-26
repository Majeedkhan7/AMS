//import jsonwebtoken package
const jwt = require('jsonwebtoken')

//Generate AccessToken
function generateAccessToken(data){
    return jwt.sign(data,process.env.ACCESS_TOKEN_SECRET)
}

//AuthenticateAcessToken
function authenticateToken(req,res,next){
    const authHeader = req.headers['authoriztion']

    if(authHeader == null) 
        return res.send("Need login first")
    
    jwt.verify(authHeader,process.env.ACCESS_TOKEN_SECRET,(err,result)=>{

            if(err){
                return res.send("Need login first")
            }
            req.data = result
            next() 
    })
}

//Export
module.exports = {
    generateAccessToken,
    authenticateToken
}