
import CourseService from "../services/course.service";
import { Request, Response } from 'express';


class CourseController{
    createCourse = async(req:Request,res:Response)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.status(200).json({
            message:"Course created successfully",
            metadata:await CourseService.AddCourse(req.body,req.user.userId)}
        )
    }
    GetPublishedCourse = async(req:Request,res:Response)=>{
        return res.status(200).json({
            message:"Get Published Course",
            metadata:await CourseService.GetPublishedCourse(req.body)}
        )
    }
    PublishCourse = async(req:Request,res:Response)=>{
        return res.status(200).json({
            message:"Course Published",
            metadata:await CourseService.PublishCourse(req.params.id)})
    }
    GetCourseById = async(req:Request,res:Response)=>{
        return res.status(200).json({
            message:`Get Course ${req.params.id}`,
            metadata:await CourseService.GetCourseById(req.params.id)
        })
    }
    UpdateCourseById = async (req:Request,res:Response)=>{
        return res.status(200).json({
            message:"Course Updated",
            metadata: await CourseService.UpdateCourse(req.params.id,req.body)
        })
    }
}

export default new CourseController()