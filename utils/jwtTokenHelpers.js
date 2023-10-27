import jwt from "jsonwebtoken"

export default function jwtTokens({user_id,username,email,password}){

    const user = {user_id,username,email,password};
    const id = user.user_id
    

    const accessToken = jwt.sign({id },process.env.ACCESS_TOKEN_SECRETE,{expiresIn:'40s'})
    const refreshToken = jwt.sign({id },process.env.REFRESH_TOKEN_SECRETE,{expiresIn:'2m'})
    return{
        accessToken,
        refreshToken
    }

}