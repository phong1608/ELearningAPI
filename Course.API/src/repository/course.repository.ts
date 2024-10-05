import { pool } from "../dbs/postgres.init";
import { Course } from "../interfaces/course.interface";
import slugify from "slugify";
import {map } from "lodash"
import { publishDirectMessage } from "../queue/producer";
import { CourseChannel } from "../server";
import { BadRequestError } from "../helpers/error-reponse";

interface ICourseObjectKeys {
    [key: string]: string | number | Date | undefined;
  }
const objKeys:ICourseObjectKeys = {
    title:"title",
    title_slug:"title_slug",
    description:"description",
    category:"category",
    price:"price",
    instructor_id:"instructor_id",
    instructor_name:"instructor_name",
    sections:"sections"
}

const addCourse = async({title,title_slug,description,image,category,price}:Course,instructor_id:string,instructor_name:string)=>{
    if(title !=null)
    {

        title_slug=slugify(title,{lower:true})
    }
    try{

        const {rows} = await pool.query(`INSERT INTO course(title,title_slug,description,image,category,price,instructor_id,instructor_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [title,title_slug,description,image,category,price,instructor_id,instructor_name]
        )
        const result = Object.fromEntries(
            Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
        )
        return result
    }
    catch(error:any){
        if(error.code==23502)
        {
            throw new BadRequestError(`${error.column} can not be null `,`Create Course`)
        }
        else throw new BadRequestError(`Database error ${error.message}`,'Create Course')
    }
}
const getCourseByTitle =async(title_slug:string)=>{
    const course = await pool.query(`SELECT
                                        c.id,
                                        c.title,
                                        c.description,
                                        c.category,
                                        c.image,
                                        c.price,
                                        c.instructor_name,
                                        c.instructor_id,
                                        JSON_AGG(
                                            JSON_BUILD_OBJECT(
                                            'id', s.id,
                                            'title', s.title,
                                            'lessons', (
                                                SELECT JSON_AGG(JSON_BUILD_OBJECT('id',l.id,'title', l.title,'duration',l.duration))
                                                FROM lesson l
                                                WHERE l.section_id = s.id
                                            )
                                            )
                                        ) AS sections
                                    FROM course c
                                    LEFT JOIN section s ON c.id = s.course_id
                                    WHERE c.title_slug = $1 
                                    GROUP BY c.id
                                    LIMIT 1; `,[title_slug])
    const mappedResult: ICourseObjectKeys[] = map(course.rows, (key) => {
        return Object.fromEntries(
        Object.entries(key).map(([key, value]) => [objKeys[key] || key, value])
        );
    });
    return mappedResult;
}
const getAllPublishedCourse = async()=>{
    const courses = await pool.query(`SELECT * FROM course WHERE course.isPublished = true`)
    const mappedResult: ICourseObjectKeys[] = map(courses.rows, (key) => {
        return Object.fromEntries(
        Object.entries(key).map(([key, value]) => [objKeys[key] || key, value])
        );
    });
    return mappedResult;
}
const publishCourseById = async(course_id:string)=>{
    const {rows} = await pool.query(`UPDATE course SET isPublished = true WHERE course.id=$1 RETURNING *`,[course_id])
    const result = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result
}
const updateCourseById = async({title,title_slug,description,image,category,price}:Course,course_id:string)=>
{
    if(title!=null)
    {
        title_slug = slugify(title,{lower:true}) 
    }
    const {rows} = await pool.query(`UPDATE course
                                    SET 
                                        title=COALESCE($1,title),
                                        title_slug = COALESCE($2,title_slug),
                                        description = COALESCE($3,image),
                                        category=COALESCE($4,category),
                                        image = COALESCE($5,image),
                                        price = COALESCE($6,price)
                                        
                                    WHERE course.id=$7
                                    RETURNING *`,[title,title_slug,description,category,image,price,course_id])
    const result = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result

}
const AddToCart=async (user_id:string,course_id:string)=>
{
    const {rows} =await pool.query(`SELECT id,title,price,instructor_id,instructor_name,category FROM course WHERE course.id =$1`,[course_id])
    const result = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    const message =JSON.stringify({user:user_id,course:result})
    const exchangeName="cart-exchange"
    const routingKey="add-to-cart"
    console.log(message)
    await publishDirectMessage(CourseChannel,exchangeName,routingKey,message)

}
    



export {addCourse,getCourseByTitle,AddToCart,publishCourseById,getAllPublishedCourse,updateCourseById}