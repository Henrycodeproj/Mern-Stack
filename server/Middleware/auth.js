import jwt from 'jsonwebtoken'

function isAuthenticated(req,res,next){
    jwt.verify(req.headers.authorization, process.env.SECRET_SESSION, (err, result) =>{
        err ? req.isAuth = false: req.isAuth = true
        next()
    })
}

export default isAuthenticated