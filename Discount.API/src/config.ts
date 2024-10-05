import dotenv from "dotenv"
dotenv.config()


class Config{
  public JWT_SECRET_KEY: string | undefined;
  public MONGODB_URL:string |undefined
  public PORT:string | undefined
  public RABBITMQ_URL:string | undefined
  public DATABASE_HOST:string | undefined
  public DATABASE_USER:string | undefined
  public DATABASE_PASSWORD:string | undefined
  public DATABASE_NAME:string | undefined

  constructor(){
    this.JWT_SECRET_KEY=process.env.JWT_SECRET_KEY||undefined
    this.MONGODB_URL=process.env.MONGODB_URL||undefined
    this.PORT=process.env.PORT||undefined
    this.RABBITMQ_URL=process.env.RABBITMQ_URL||undefined
    this.DATABASE_HOST=process.env.DATABASE_HOST||undefined
    this.DATABASE_USER = process.env.DATABASE_USER||undefined
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || undefined
    this.DATABASE_NAME = process.env.DATABASE_NAME || undefined
  }



}



export const config = new Config()