import {  Request,Response } from 'express';
import UserService from '../services/user.service';
class UserController{
    GetUserCourse = async (req:Request, res:Response) =>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.status(200).json({
            message:"User's Course",
            metadata: await UserService.GetAllUserCourse(req.user?.userId.toString())
        })

    }
}
export default new UserController()