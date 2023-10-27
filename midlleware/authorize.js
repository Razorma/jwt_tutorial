import jwt from "jsonwebtoken"

export default function authenticateToken(req,res,next){
    const authHeaders =  req.cookies['Custom-Header'];
    

    const token = authHeaders 

    if(token===null){
        res.status(401).send('Unauthorized')
        res.redirect("/")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE ,(error,user)=>{
        if(error){
            res.redirect("/")
        }else{
            req.user=user
            next()
        }
    })

}