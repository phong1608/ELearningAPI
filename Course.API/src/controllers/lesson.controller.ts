import {  NextFunction, Request,Response } from 'express';
import LessonSerivces from "../services/lesson.service"

class LessonController{
    AddLesson = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            
            return res.status(201).json({
                message:"Lesson Added",
                metadata: await LessonSerivces.AddLesson(req.body)
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    GetLessonById = async(req:Request,res:Response,next:NextFunction)=>{
        try{

            return res.status(200).json({
                message:"Lesson Getted",
                metadata: await LessonSerivces.GetLessonById(req.params.id)
            })
        }
        catch(err){
            next(err)
        }
    }
}
export default new LessonController()