import lessonModel from "../models/lesson.model";
import sectionModel from "../models/section.model";
import Lesson from "../types/lesson.type";



class LessonService{
    static async AddLesson(lesson:Lesson){
        const newLesson = new lessonModel(lesson)
        if(!await sectionModel.findById(newLesson.section_id))
            throw new Error("Could not find section")
        await sectionModel.findByIdAndUpdate(lesson.section_id, {
            $push: { lessons: newLesson._id }
        });
        return await newLesson.save()
    }
    static async GetLessonsFromSection(section_id:string):Promise<Lesson[]>
    {
        return await lessonModel.find({section_id:section_id})
    }
    static async GetLessonById(id:string):Promise<Lesson>
    {
        const lesson= await lessonModel.findById(id)
        if(!lesson)
            throw new Error("Lesson not found")
        return lesson
    }
}


export default LessonService