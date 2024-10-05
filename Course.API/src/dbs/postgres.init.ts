import {Pool} from "pg"
import { config } from "../config"


const pool = new Pool({
    host: config.DATABASE_HOST,
    port:5432,
    user:config.DATABASE_USER,
    password:config.DATABASE_PASSWORD
})

const queryText = `CREATE TABLE IF NOT EXISTS public.course(
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    title text NOT NULL,
                    title_slug text,
                    category TEXT[] NOT NULL,
                    price INTEGER NOT NULL,
                    description TEXT NOT NULL,
                    instructor_id TEXT NOT NULL,
                    instructor_name TEXT NOT NULL,
                    image TEXT NOT NULL,
                    isPublished BOOLEAN NOT NULL DEFAULT FALSE

                );
                CREATE TABLE IF NOT EXISTS public.section(
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    title TEXT NOT NULL,
                    course_id UUID NOT NULL,
                    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS public.lesson(
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    title TEXT NOT NULL,
                    duration TEXT NOT NULL,
                    video_url TEXT NOT NULL,
                    section_id UUID NOT NULL,
                    FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE CASCADE

                );
                CREATE TABLE IF NOT EXISTS public.user_course(
                    user_id TEXT NOT NULL,
                    course_id UUID NOT NULL,
                    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
                    user_rating INTEGER DEFAULT 0
                );    

`
const databaseConnection = async()=>{
    try{
        await pool.connect()
        await pool.query(queryText)
        console.log("Connect to PostgresSQL Successfully")

    }
    catch(err){
        console.error("Error connecting to Postgres ",err)
    }
}



export {pool,databaseConnection}