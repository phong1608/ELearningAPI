import { IAuthPayload } from '../interfaces/auth.interface';
import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
import { config } from "../config";
 

class AuthMiddleware{
    public async verifyUser(req: Request,res:Response ,next:NextFunction)
    {
        const tokens = req.headers.authorization
        if(!tokens)
            throw new Error()
        if(!config.JWT_SECRET_KEY)
        {

            return res.send("Key not provided")
        }
        const decoder:IAuthPayload = await jwt.verify(tokens,config.JWT_SECRET_KEY) as IAuthPayload
        req.user=decoder
        return next()
    }
    // public async verifyUserAccess(req: Request,res:Response,next:NextFunction)
    // {


    //     return next()
    // }
}
export default new AuthMiddleware()