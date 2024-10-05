import { Course } from "../interfaces/course.interface";
import { addCourse,getCourseByTitle,AddToCart,publishCourseById,getAllPublishedCourse, updateCourseById } from "../repository/course.repository";
class CourseServices{
    static async addNewCourse(course: Course,instructor_id:string,instructor_name:string)
    {

        return await addCourse(course,instructor_id,instructor_name)
    }
    static async getCoursePreview(title_slug:string)
    {
        return await getCourseByTitle(title_slug)
    }
    static async addToCart(user_id:string,course_id:string)
    {
        return await AddToCart(user_id,course_id)
    }
    static async publishCourseById(course_id:string){
        return await publishCourseById(course_id)
    }
    static async getAllPublishedCourse()
    {
        return await getAllPublishedCourse()
    }
    static async updateCourseById(course:Course,course_id:string)
    {
        return await updateCourseById(course,course_id)
    }

}


export default CourseServices