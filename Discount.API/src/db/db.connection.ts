import {Pool} from "pg"
import {config} from "../config"

const pool:Pool = new Pool({
    host:config.DATABASE_HOST,
    port:5432,
    user:config.DATABASE_USER,
    password:config.DATABASE_PASSWORD,
    database:config.DATABASE_NAME
})

const createTable = `DO $$
                    BEGIN
                        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'type') THEN
                            CREATE TYPE type AS ENUM ('percentage', 'fixed');
                        END IF;
                    END $$;
                    CREATE TABLE IF NOT EXISTS public.discount(
                        id SERIAL NOT NULL,
                        type type NOT NULL,
                        amount INTEGER NOT NULL,
                        course_id TEXT NOT NULL,
                        valid_to TIMESTAMP NOT NULL,
                        public BOOLEAN DEFAULT FALSE,
                        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        
                    );`


const databaseConnection = async()=>{
    try{
        await pool.connect()
        console.log("Connect to PostgresSQL Successfully")
        await pool.query(createTable)

    }
    catch(err){
        console.error("Error connecting to Postgres ",err)
    }
}
export {databaseConnection,pool}