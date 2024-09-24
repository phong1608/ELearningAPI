import { Types } from "mongoose";

export default interface UserCourse{
    user:Types.ObjectId,
    courses:[]
}