import { AddUserCourse,getAllUserCourse,addUserRating } from "../repository/user.repository";
import User from "../interfaces/user.interface";


class UserService{
    static async AddUserCourse(user:User)
    {
        return await AddUserCourse(user);
    }
    static async GetAllUserCourse(user_id:string){
        return await getAllUserCourse(user_id)
    }
    static async AddUserRating(user_id:string,rating:number,course_id:string){
        return await addUserRating(rating,user_id,course_id)
    }
}
export default UserService