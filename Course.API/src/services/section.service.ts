import sectionModel from "../models/section.model";
import Section  from "../types/section.type";
import courseModel from "../models/course.model";


class SectionService{

    static async AddSection(section:Section){
        const newSection =new sectionModel(section)
        if(await sectionModel.find({order:section.order})){
            await sectionModel.updateMany(
                { order: { $gte: section.order } }, 
                { $inc: { order: 1 } }, 
                { new: true } 
              )
        }
        await courseModel.findByIdAndUpdate(section.course_id, {
            $push: { sections: newSection._id }
        });
        return await newSection.save()
    }
    static async GetAllSectionByCourse(course_id:string):Promise<Section[]>{
        return await sectionModel.find({course_id: course_id})
    }

    
    
}
export default SectionService