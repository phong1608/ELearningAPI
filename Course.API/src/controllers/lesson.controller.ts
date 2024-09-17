import {  Request,Response } from 'express';
import LessonService from "../services/lesson.service";


class LessonController{
    AddLesson = async(req:Request,res:Response)=>{
        return res.status(201).json({
            message:"Lesson Added",
            metadata: await LessonService.AddLesson(req.body)
        })
    }
    GetLessonById = async(req:Request,res:Response)=>{
        return res.status(200).json({
            message:"Lesson Getted",
            metadata: await LessonService.GetLessonById(req.params.id)
        })
    }
}
export default new LessonController()