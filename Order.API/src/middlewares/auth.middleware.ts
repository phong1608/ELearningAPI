import jwt from "jsonwebtoken"


import { Request,Response,NextFunction } from "express"
import { config } from "../config"
import { IAuthPayload } from "../interfaces/auth.interface"


class AuthMiddlware{
    public verifyUser(req:Request,res:Response,next:NextFunction)
    {
        const tokens = req.headers.authorization
        if(!tokens)
        {
            throw new Error("Access Token is required")
        }
        if(!config.JWT_SECRET_KEY)
        {
            return res.send("Secret Key is not provided")
        }
        const payload:IAuthPayload = jwt.verify(tokens,config.JWT_SECRET_KEY)as IAuthPayload
        req.user = payload
        next()

    }
}
export default new AuthMiddlware()