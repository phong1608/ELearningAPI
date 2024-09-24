import { Document,Types } from "mongoose";
export default interface User extends Document{
    user:Types.ObjectId,
    course: Array<Types.ObjectId>
}
