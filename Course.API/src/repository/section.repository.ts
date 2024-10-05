import { pool } from "../dbs/postgres.init";
import Section from "../interfaces/section.interface";
import { map } from "lodash";

interface ISectionObjectKeys {
    [key: string]: string | number | Date | undefined;
  }
const objKeys:ISectionObjectKeys = {
    title:"title",
    course_id:"course_id"
}

const addSection = async({title,course_id}:Section)=>{
    const {rows} = await pool.query(`INSERT INTO section(title,course_id) VALUES($1,$2) RETURNING *`,[title,course_id])
    const result = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result
    

}
const getAllSectionByCourse = async(course_id:string)=>
{
    const sections = await  pool.query(`SELECT
                                            s.title,
                                            JSON_AGG(
                                                JSON_BUILD_OBJECT(
                                                'title',l.title,
                                                'video_url',l.video_url,
                                                'duration',l.duration)) AS lessons
                                        FROM section s
                                        LEFT JOIN lesson l ON s.id = l.section_id
                                        WHERE s.course_id =$1
                                        GROUP BY s.id;
                                        `,[course_id])
    const mappedResult: ISectionObjectKeys[] = map(sections.rows, (key) => {
        return Object.fromEntries(
        Object.entries(key).map(([key, value]) => [objKeys[key] || key, value])
        );
    });
    return mappedResult;
}
export {addSection,getAllSectionByCourse}