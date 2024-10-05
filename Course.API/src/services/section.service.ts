import Section from "../interfaces/section.interface";
import { addSection,getAllSectionByCourse } from "../repository/section.repository";


class SectionService{
    static async addSection(section:Section){
        return await addSection(section)
    }
    static async getAllSectionByCourse(course_id:string )
    {
        return await getAllSectionByCourse(course_id)
    }
}
export default SectionService