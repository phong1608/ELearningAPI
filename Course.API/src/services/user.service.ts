import { Types } from "mongoose";
import User from "../interfaces/user.interface";
import userModel from "../models/user.model";


class UserService{
    static async AddUserCourrse({user,course}:User):Promise<User>
    {
        return await userModel.findOneAndUpdate({user:user},{$push:{course:course}},{upsert:true,new:true})
    }
    static async CheckUserEnrollment(user:Types.ObjectId,course:Types.ObjectId):Promise<boolean> 
    {
        const userCourse = await userModel.findOne({user:user})
        if(!userCourse)
        {
            return false
        }
        return userCourse.course.includes(course)
    }
}

export default UserService