import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export class HealthController{
    public health(req:Request,res:Response):void{
         res.status(StatusCodes.OK).send("GatewayAPI health is ok");
    }
}






