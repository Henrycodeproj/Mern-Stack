import jwt from 'jsonwebtoken'

function isAuthenticated(req,res,next){
    jwt.verify(req.headers.authorization, process.env.SECRET_SESSION, (err, result) =>{
        result ? req.isAuth = true: req.isAuth = false
        next()
    })
}

export default isAuthenticated