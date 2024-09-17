import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()

const JWT_TOKEN = process.env.JWT_TOKEN||""

class AuthMiddleware{
    public verifyUser(req:Request, res:Response,next:NextFunction):void{
        if(req.session?.jwt)
        {
            throw new Error("No jwt token")
        }
        try{
            const payload = jwt.verify(req.session?.jwt,JWT_TOKEN)
            req.body.currentUser= payload
        }
        catch(error){

        }
        next()
    }
}