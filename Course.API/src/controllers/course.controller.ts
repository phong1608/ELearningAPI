
import { NextFunction, Request, Response } from 'express';
import CourseServices from "../services/course.service";

class CourseController{
    createCourse = async(req:Request,res:Response,next:NextFunction)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        try{

            return res.status(200).json({
                message:"Course created successfully",
                metadata:await CourseServices.addNewCourse(req.body,req.user.userId.toString(),req.user.name)}
            )
        }
        catch(err){
            next(err)
        }
    }
    GetPublishedCourse = async(_req:Request,res:Response,next:NextFunction)=>{
        try{

            return res.status(200).json({
                message:"Get Published Course",
                metadata:await CourseServices.getAllPublishedCourse()}
            )
        }
        catch(err)
        {
            next(err)
        }
    }
    PublishCourse = async(req:Request,res:Response,next:NextFunction)=>{
        try{

            return res.status(200).json({
                message:"Course Published",
                metadata:await CourseServices.publishCourseById(req.params.id)})
        }
        catch(err)
        {
            next(err)
        }
    }
    GetCourseById = async(req:Request,res:Response)=>{
        return res.status(200).json({
            message:`Get Course ${req.params.title}`,
            metadata:await CourseServices.getCoursePreview(req.params.title)
        })
    }
    UpdateCourseById = async (req:Request,res:Response,next:NextFunction)=>{
        try{

            return res.status(200).json({
                message:"Course Updated",
                metadata: await CourseServices.updateCourseById(req.body,req.params.id)
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    addToCart = async(req:Request,res:Response,next:NextFunction)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        try{

            return res.status(200).json({
                message:"Added to cart",
                metadata:await CourseServices.addToCart(req.user?.userId.toString(),req.params.id)
            })
        }
        catch(err){
            next(err)
        }
        
    }
}

export default new CourseController()