import Lesson from "../interfaces/lesson.interface";
import { pool } from "../dbs/postgres.init";

interface ILessonObjectKeys {
    [key: string]: string | number | Date | undefined;
  }
const objKeys:ILessonObjectKeys = {
    title:"title",
    duration:"duration",
    video_url:"video_url",
    section_id:"section_id"
}



const addLesson = async({title,duration,video_url,section_id}:Lesson)=>{
    const {rows} = await pool.query(`INSERT INTO lesson(title,duration,video_url,section_id) VALUES($1,$2,$3,$4) RETURNING *`,[title,duration,video_url,section_id])
    const result = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result
}
const getLessonById = async(lesson_id:string)=>{
    const {rows} = await pool.query(`SELECT * FROM lesson WHERE lesson.id=$1`,[lesson_id])
    const result = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result
}
export {addLesson,getLessonById}