import jwt from "jsonwebtoken"
import { config } from "../../config"



const createTokenPair = async(userId:string)=>{
    if(!config.JWT_SECRET_KEY)
        throw new Error("")
    const accessToken = await jwt.sign({userId:userId},config.JWT_SECRET_KEY,{
        "algorithm": "HS256",
        "expiresIn":"7 days"
    })
    
    return accessToken


}




export default createTokenPair