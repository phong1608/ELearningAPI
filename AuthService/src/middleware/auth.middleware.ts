import { Response,Request,Application,NextFunction } from 'express';

import jwt from "jsonwebtoken"



class AuthMiddleware{
    constructor(app:Application){

    }

    public checkAuthentication(req:Request, res:Response, next:NextFunction){
        
    }
}