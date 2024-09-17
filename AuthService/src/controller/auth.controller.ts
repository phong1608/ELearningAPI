import { NextFunction,Request,Response } from "express";
import AuthService from "../services/auth.service";


class AuthController{
    signIn = async(req: Request, res: Response,next:NextFunction)=>{
        return res.json({
            message:"SignIn Successfully ",
            metadata:await AuthService.signIn(req.body)
        })
    }
    register = async(req: Request, res: Response,next:NextFunction)=>{
        return res.json({
            message:"Register Successfully ",
            metadata:await AuthService.register(req.body)

        })
    }
    
}

export default new AuthController()