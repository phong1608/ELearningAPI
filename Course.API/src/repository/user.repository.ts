import { pool } from "../dbs/postgres.init";
import User from "../interfaces/user.interface";
import { map } from "lodash";

interface IUserObjectKeys {
    [key: string]: string | number | Date | undefined;
  }
const objKeys:IUserObjectKeys = {
    user:"user",
    course:"course"
}

const AddUserCourse = async({user,course}:User)=>{
    return await pool.query(`INSERT INTO user_course (user_id, course_id) VALUES($1, $2)`,[user, course]);
}
const getAllUserCourse = async(user_id:string)=>
{
    const results = await pool.query(`SELECT * FROM user_course WHERE user =$1`,[user_id]);
    const mappedResult: IUserObjectKeys[] = map(results.rows, (key) => {
        return Object.fromEntries(
        Object.entries(key).map(([key, value]) => [objKeys[key] || key, value])
        );
    });
    return mappedResult;
}
const addUserRating  = async(rating:number,user_id:string,course_id:string)=>{
    await pool.query(`UPDATE user_course SET user_rating = $1 WHERE user_id=$2 AND course_id=$3`,[rating,user_id,course_id])
}

export {AddUserCourse,getAllUserCourse,addUserRating}



