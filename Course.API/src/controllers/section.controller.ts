import { Response,Request, NextFunction } from 'express';
import SectionServices from "../services/section.service"

class SectionController{
    AddSection = async(req:Request,res:Response,next:NextFunction)=>{
        try{

            return res.status(201).json({
                message:"New Section Added",
                metadata:await SectionServices.addSection(req.body)
            })
        }
        catch(err){
            next(err)
        }
    }
    GetAllSectionByCourse= async(req:Request,res:Response)=>{
        return res.status(201).json({
            message:"All Sections By Course",
            metadata: await SectionServices.getAllSectionByCourse(req.params.id)
        })
    }
    
}
export default new SectionController();