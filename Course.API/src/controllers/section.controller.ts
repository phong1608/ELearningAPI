import { Response,Request } from 'express';
import SectionService from "../services/section.service";


class SectionController{
    AddSection = async(req:Request,res:Response)=>{
        return res.status(201).json({
            message:"New Section Added",
            metadata:await SectionService.AddSection(req.body)
        })
    }
    GetAllSectionByCourse= async(req:Request,res:Response)=>{
        return res.status(201).json({
            message:"All Sections By Course",
            metadata: await SectionService.GetAllSectionByCourse(req.params.id)
        })
    }
    
}
export default new SectionController();