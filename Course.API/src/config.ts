import dotenv from "dotenv"
dotenv.config()


class Config{
  public JWT_SECRET_KEY: string | undefined;
  public MONGODB_URL:string |undefined
  public RABBITMQ_URL:string | undefined
  public PORT:string | undefined

  constructor(){
    this.JWT_SECRET_KEY=process.env.JWT_SECRET_KEY||undefined
    this.MONGODB_URL=process.env.MONGODB_URL||undefined
    this.RABBITMQ_URL = process.env.RABBITMQ_URL||undefined
    this.PORT=process.env.PORT||undefined
  }



}



export const config = new Config()