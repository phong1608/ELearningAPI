import { Types } from "mongoose";
import courseModel from "../models/course.model";
import { Course } from "../types/course.type";


class CourseService{
    static async AddCourse(course:Course,instructor_id:Types.ObjectId){
        course.instructor_id=instructor_id
        const newCourse = new courseModel(course)
        return await newCourse.save()
    }
    static async GetPublishedCourse(limit:number=50,skip:number=0):Promise<Course[]>{
        const query = {isPublished:true}
        return await courseModel.find(query)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
    }
    static async GetCourseById(id:string):Promise<Course>{
        const course = await courseModel.findById(id)
        .populate({
            path: 'sections',
            select: 'title _id order lessons',
            populate: {
              path: 'lessons',
              select: 'title duration' 
            }
          })
        .lean()
        .exec()
        if(!course)
            throw new Error('Not Found')
        return course
    }
    static async PublishCourse(course_id:string):Promise<Course>{
        const course = await courseModel.findById(course_id)
        if(!course)
            throw new Error("Course not found")
        course.isPublished =true
        await course.save()
        return course

    }
    static async UpdateCourse(course_id:string,updateBody:Course):Promise<Course>
    {
        const updateCourse= await courseModel.findByIdAndUpdate(course_id,updateBody,{new:true})
        if(!updateCourse)
            throw new Error("Course not found")
        return updateCourse
    }
    
}

export default CourseService