import { Types } from "mongoose";
import User from "../interfaces/user.interface";
import userModel from "../models/user.model";


class UserService{
    static async AddUserCourse({user,course}:User):Promise<User>
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
    static async GetUserCourse(user_id:Types.ObjectId)
    {
        await userModel.findOne({user:user_id}).populate({
            path:"courses",
            select:"title image user_review"
        })
    }
    static async AddUserRating(user:string,course_id:string,rating:number)
    {
        return await userModel.findOneAndUpdate(
            { _id: user, "courses.courseId": course_id },
            { $set: { "courses.$.rating": rating } },
            { new: false } 
          );
    }
}

export default UserService