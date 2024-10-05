import Lesson from "../interfaces/lesson.interface";
import { addLesson, getLessonById } from "../repository/lessson.repository";


class LessonService{


    static async AddLesson(lesson:Lesson){
        return await addLesson(lesson)
    }
    static async GetLessonById(lesson_id:string)
    {
        return await getLessonById(lesson_id)
    }
}
export default LessonService